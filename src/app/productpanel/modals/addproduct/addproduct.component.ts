import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Category } from 'src/app/shared/model/category';
import { Product } from 'src/app/shared/model/product';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit, OnDestroy {
  @Input() categories!: Category[];
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public productImage!: File;
  public fileName!: string;
  public files: any;
  public categorySelected: FormControl = new FormControl();

  constructor(public activeModal: NgbActiveModal, private productService: ProductService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public saveNewProduct(): void {
    this.clickButton('new-product-save');
  }

  public onAddNewProduct(productForm: NgForm): void {
    const formData = this.productService.createProductFormDate("", productForm.value, this.productImage);
    formData.append('categoryName', this.categorySelected.value);
    this.subscriptions.push(
      this.productService.addProduct(formData).subscribe(
        (response: Product) => {
          productForm.reset();
          this.activeModal.close('Ok click')
          this.sendNotification(NotificationType.SUCCESS, `${response.name} added successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
      );
  }

  public onProductImageChange(event: any): void {
    const filesEvent = Object.keys(event.target.files).map((key: any) => event.target.files[key]);
    this.files = filesEvent[0];
    this.fileName =  this.files.name;
    this.productImage = this.files;
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
