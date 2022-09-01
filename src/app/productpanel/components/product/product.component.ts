import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Category } from 'src/app/shared/model/category';
import { Product } from 'src/app/shared/model/product';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { AddproductComponent } from '../../modals/addproduct/addproduct.component';
import { DeleteproductComponent } from '../../modals/deleteproduct/deleteproduct.component';
import { EditproductComponent } from '../../modals/editproduct/editproduct.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  public products!: Product[] | null;
  public categories!: Category[] | null;
  public product!: Product;
  public refreshing!: boolean;
  public selectedProduct!: Product;
  private subscriptions: Subscription[] = [];
  public editProduct = new Product();
  private currentName!: string;

  constructor(private router: Router, private authenticationService: AuthenticationService, private modalService: NgbModal,
    private productService: ProductService, private categoryService: CategoryService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getProducts(true);
    this.getCategories(false);
  }

  public getProducts(showNotification: boolean): void {
    this.subscriptions.push(
      this.productService.getProducts().subscribe(
        (response: any[]) => {
          this.products = response;
          for (let i = 0; i < response.length; i++) {
            this.products[i]["categoryName"] = response[i]["category"]["name"];
          }
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} product(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public getCategories(showNotification: boolean): void {
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe(
        (response: Category[]) => {
          this.categories = response;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} categorie(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public onAddNewProduct(): void {
    const modalRef = this.modalService.open(AddproductComponent);
    modalRef.componentInstance.categories = this.categories;
    modalRef.result.then(
      () => {
        this.getProducts(false);
      },
      () => {
      });
  }

  public onDeleteProduct(product: Product): void {
    const modalRef = this.modalService.open(DeleteproductComponent);
    modalRef.componentInstance.name = product.name;
    modalRef.result.then(
      () => {
        this.getProducts(false);
      },
      () => {
      });
  }

  public onEditProduct(editProduct: Product): void {
    const modalRef = this.modalService.open(EditproductComponent);
    modalRef.componentInstance.editProduct = editProduct;
    modalRef.componentInstance.currentName = editProduct.name;
    modalRef.componentInstance.categories = this.categories;
    this.editProduct = editProduct;
    this.currentName = editProduct.name;
    modalRef.result.then(
      () => {
        this.getProducts(false);
      },
      () => {
      });
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
