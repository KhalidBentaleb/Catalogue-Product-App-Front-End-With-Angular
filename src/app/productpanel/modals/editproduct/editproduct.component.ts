import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Category } from 'src/app/shared/model/category';
import { Product } from 'src/app/shared/model/product';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit, OnDestroy {
  @Input() editProduct!: Product;
  @Input() currentName!: string;
  @Input() categories!: Category[];
  public productImage!: any;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public fileName!: any;
  public files: any;
  public categorySelected: FormControl = new FormControl();

  constructor(public activeModal: NgbActiveModal, private productService: ProductService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public onUpdateProduct(): void {
    const formData = this.productService.createProductFormDate(this.currentName, this.editProduct, this.productImage);
    formData.append('categoryName', this.categorySelected.value);
    this.subscriptions.push(
      this.productService.updateProduct(formData).subscribe(
        (response: Product) => {
          this.fileName = null;
          this.productImage = null;
          this.activeModal.close('Ok click')
          this.sendNotification(NotificationType.SUCCESS, `${response.name} updated successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.productImage = null;
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
