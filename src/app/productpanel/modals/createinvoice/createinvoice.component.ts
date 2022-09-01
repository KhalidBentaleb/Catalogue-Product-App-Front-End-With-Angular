import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Cart } from 'src/app/shared/model/cart';
import { Invoice } from 'src/app/shared/model/invoice';
import { CartService } from 'src/app/shared/service/cart.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent implements OnInit {
  @Input() invoiceId: any;
  public invoices!: Invoice[];
  public refreshing!: boolean;
  private subscriptions: Subscription[] = [];
  public carts: Array<Cart> = [];
  public totalPrice: any = 0;
  public totalCurrency!: any;

  constructor(public modal: NgbActiveModal, private cartService: CartService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartService.getProductInvoices().subscribe(
        (response: any[]) => {
          for (let i = 0; i < response.length; i++) {
            if(response[i]["invoice"]["id"] == this.invoiceId){
              let cartObj = new Cart();
              cartObj.productName = response[i]["product"]["name"];
              cartObj.productPrice = response[i]["product"]["price"];
              cartObj.productCurrency = response[i]["product"]["currency"];
              cartObj.quantity = response[i]["quantity"];
              cartObj.quantityPrice = response[i]["quantity"]*cartObj.productPrice;
              this.totalCurrency = response[i]["product"]["currency"];
              this.carts.push(cartObj);
              for (let i = 0; i < this.carts.length; i++) {
                this.totalPrice += this.carts[i]["quantityPrice"];
              }
            }
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
