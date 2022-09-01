import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccessmanagementComponent } from './components/accessmanagement/accessmanagement.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { IntlModule } from '@progress/kendo-angular-intl';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterModule } from '@angular/router';
import { EdituserComponent } from './modals/edituser/edituser.component';
import { DeleteuserComponent } from './modals/deleteuser/deleteuser.component';
import { InfouserComponent } from './modals/infouser/infouser.component';
import { AdduserComponent } from './modals/adduser/adduser.component';
import { AddcategoryComponent } from './modals/addcategory/addcategory.component';
import { EditcategoryComponent } from './modals/editcategory/editcategory.component';
import { DeletecategoryComponent } from './modals/deletecategory/deletecategory.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { AddproductComponent } from './modals/addproduct/addproduct.component';
import { EditproductComponent } from './modals/editproduct/editproduct.component';
import { DeleteproductComponent } from './modals/deleteproduct/deleteproduct.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { DeleteinvoiceComponent } from './modals/deleteinvoice/deleteinvoice.component';
import { CreateinvoiceComponent } from './modals/createinvoice/createinvoice.component';


@NgModule({
  declarations: [DashboardComponent, AccessmanagementComponent, EdituserComponent, DeleteuserComponent, InfouserComponent, AdduserComponent, CategoryComponent, AddcategoryComponent, EditcategoryComponent, DeletecategoryComponent, CategoryComponent, ProductComponent, AddproductComponent, EditproductComponent, DeleteproductComponent, CategorydetailsComponent, InvoiceComponent, DeleteinvoiceComponent, CreateinvoiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatNativeDateModule,
    PDFExportModule,
    IntlModule,
    GridModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
  ]
})
export class ProductpanelModule { }
