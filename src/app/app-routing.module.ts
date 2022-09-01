import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AccessmanagementComponent } from './productpanel/components/accessmanagement/accessmanagement.component';
import { CategoryComponent } from './productpanel/components/category/category.component';
import { CategorydetailsComponent } from './productpanel/components/categorydetails/categorydetails.component';
import { DashboardComponent } from './productpanel/components/dashboard/dashboard.component';
import { InvoiceComponent } from './productpanel/components/invoice/invoice.component';
import { ProductComponent } from './productpanel/components/product/product.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AuthenticationGuard } from './shared/guard/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productpanel/editprofile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'productpanel/dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'productpanel/category', component: CategoryComponent, canActivate: [AuthenticationGuard] },
  { path: "productpanel/category/:categoryName", component: CategorydetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'productpanel/product', component: ProductComponent, canActivate: [AuthenticationGuard] },
  { path: 'productpanel/invoice', component: InvoiceComponent, canActivate: [AuthenticationGuard] },
  { path: 'productpanel/accessmanagement', component: AccessmanagementComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
