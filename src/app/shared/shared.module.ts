import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationService } from './service/notification.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HeaderComponent } from './components/header/header.component';
import { ColumnoneComponent } from './layouts/columnone/columnone.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  exports: [
      CommonModule,
      PerfectScrollbarModule,
      ColumnoneComponent
  ],
  declarations: [
    HeaderComponent,
    ColumnoneComponent,
    SidenavComponent,
    ColumnoneComponent,
    ProfileComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NotificationService, 
    AuthenticationGuard
  ]
})
export class SharedModule { }
