import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { NotificationModule } from './notification.module';
import { SharedModule } from './shared/shared.module';
import { ProductpanelModule } from './productpanel/productpanel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AuthenticationModule,
    NotificationModule,
    SharedModule,
    ProductpanelModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
        provide: LocationStrategy, 
        useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
