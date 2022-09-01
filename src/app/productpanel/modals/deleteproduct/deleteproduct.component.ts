import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/shared/model/custom-http-response';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {
  @Input() name: any;

  constructor(public modal: NgbActiveModal, private productService: ProductService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.name).subscribe(
      (response: CustomHttpRespone) => {
        this.sendNotification(NotificationType.SUCCESS, response.message);
        this.modal.close('Ok click');
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message);
      }
    )
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
