import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/shared/model/custom-http-response';
import { CartService } from 'src/app/shared/service/cart.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-deleteinvoice',
  templateUrl: './deleteinvoice.component.html',
  styleUrls: ['./deleteinvoice.component.css']
})
export class DeleteinvoiceComponent implements OnInit {
  @Input() id: any;

  constructor(public modal: NgbActiveModal, private cartService: CartService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onDeleteInvoice() {
    this.cartService.deleteInvoice(this.id).subscribe(
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
