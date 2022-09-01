import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Cart } from 'src/app/shared/model/cart';
import { Invoice } from 'src/app/shared/model/invoice';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { CreateinvoiceComponent } from '../../modals/createinvoice/createinvoice.component';
import { DeleteinvoiceComponent } from '../../modals/deleteinvoice/deleteinvoice.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  public invoices!: Invoice[];
  public refreshing!: boolean;
  private subscriptions: Subscription[] = [];
  public carts: Array<Cart> = [];
  public totalPrice: any = 0;
  public totalCurrency!: any;

  constructor(private router: Router, private authenticationService: AuthenticationService, private modalService: NgbModal,
    private cartService: CartService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getInvoices(true);
  }

  public getInvoices(showNotification: boolean): void {
    this.subscriptions.push(
      this.cartService.getInvoices().subscribe(
        (response: Invoice[]) => {
          this.invoices = response;
          this.cartService.getProductInvoices().subscribe(
            (response: any[]) => {
              for (let j = 0; j < this.invoices.length; j++) {
                for (let i = 0; i < response.length; i++) {
                  this.invoices[j]["total"] = response[i]["product"]["price"] * response[i]["quantity"];
                }
              }
            },
            (errorResponse: HttpErrorResponse) => {
              this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            }
          )
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} invoice(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public onDeleteInvoice(invoice: Invoice): void {
    const modalRef = this.modalService.open(DeleteinvoiceComponent);
    modalRef.componentInstance.id = invoice.id;
    modalRef.result.then(
      () => {
        this.getInvoices(false);
      },
      () => {
      });
  }

  public onDonwloadInvoice(invoice: Invoice): void {
    const modalRef = this.modalService.open(CreateinvoiceComponent);
    modalRef.componentInstance.invoiceId = invoice.id;
    modalRef.result.then(
      () => {
        this.getInvoices(false);
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
