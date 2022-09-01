import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Cart } from 'src/app/shared/model/cart';
import { Invoice } from 'src/app/shared/model/invoice';
import { Product } from 'src/app/shared/model/product';
import { ProductInvoice } from 'src/app/shared/model/productInvoice';
import { User } from 'src/app/shared/model/user';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent implements OnInit, OnDestroy {
  public products: Array<Product> = [];
  public carts: Array<Cart> = [];
  private subscriptions: Subscription[] = [];
  public productSelectedName!: string;
  public quantitySelected!: any;
  public totalPrice: any = 0;
  public totalCurrency!: any;
  public user!: User;

  constructor(private productService: ProductService, private notificationService: NotificationService, private route: Router,
              private router: ActivatedRoute, private cartService: CartService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.productSelectedName = params["categoryName"];
    });
    this.getProducts(true);
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  public getProducts(showNotification: boolean): void {
    this.subscriptions.push(
      this.productService.getProducts().subscribe(
        (response: any[]) => {
          for (let i = 0; i < response.length; i++) {
            if(response[i]["category"]["name"] == this.productSelectedName){
              let productObj = new Product();
              productObj.name = response[i]["name"];
              productObj.price = response[i]["price"];
              productObj.currency = response[i]["currency"];
              productObj.productImageUrl = response[i]["productImageUrl"];
              productObj.categoryName = response[i]["category"]["name"];
              this.products.push(productObj);
            }
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

  public changeInput(event: any) {
    this.quantitySelected = event.target.value;
  }

  public addToCart(appProduct: Product){
    let cartObj = new Cart();
    cartObj.productName = appProduct["name"];
    cartObj.productPrice = appProduct["price"];
    cartObj.productCurrency = appProduct["currency"];
    cartObj.quantity = this.quantitySelected;
    cartObj.quantityPrice = this.quantitySelected*cartObj.productPrice;
    this.totalCurrency = appProduct["currency"];
    this.carts.push(cartObj);
    for (let i = 0; i < this.carts.length; i++) {
      this.totalPrice += this.carts[i]["quantityPrice"];
    }
  }

  public createInvoice(){
    const formData = new FormData();
    formData.append('username', this.user.username);
    this.subscriptions.push(
      this.cartService.addInvoice(formData).subscribe(
        (response: Invoice) => {
          for (let i = 0; i < this.carts.length; i++) {
            const formDataPI = new FormData();
            formDataPI.append('invoiceId', JSON.stringify(response["id"]));
            formDataPI.append('productName', this.carts[i]["productName"]);
            formDataPI.append('quantity', this.carts[i]["quantity"]);
            this.cartService.addProductInvoice(formDataPI).subscribe(
              (response: ProductInvoice) => {
              },
              (errorResponse: HttpErrorResponse) => {
                this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
              }
            )
          }
          this.route.navigateByUrl('/productpanel/invoice');
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
