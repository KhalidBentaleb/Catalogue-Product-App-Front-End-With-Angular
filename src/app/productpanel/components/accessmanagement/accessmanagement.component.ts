import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { User } from 'src/app/shared/model/user';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AdduserComponent } from '../../modals/adduser/adduser.component';
import { DeleteuserComponent } from '../../modals/deleteuser/deleteuser.component';
import { EdituserComponent } from '../../modals/edituser/edituser.component';
import { InfouserComponent } from '../../modals/infouser/infouser.component';

@Component({
  selector: 'app-accessmanagement',
  templateUrl: './accessmanagement.component.html',
  styleUrls: ['./accessmanagement.component.css']
})
export class AccessmanagementComponent implements OnInit, OnDestroy {
  public users!: User[] | null;
  public user!: User;
  public refreshing!: boolean;
  public selectedUser!: User;
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  private currentUsername!: string;

  constructor(private router: Router, private authenticationService: AuthenticationService, private modalService: NgbModal,
              private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getUsers(true);
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );

  }

  public onSelectUser(selectedUser: User): void {
    const modalRef = this.modalService.open(InfouserComponent);
    modalRef.componentInstance.selectedUser = selectedUser;
  }

  public onAddNewUser(): void {
    const modalRef = this.modalService.open(AdduserComponent);
    modalRef.result.then(
      () => {
        this.getUsers(false);
      },
      () => {
      });
  }

  public searchUsers(searchTerm: string): void {
    const results: User[] = [];
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !searchTerm) {
      this.users = this.userService.getUsersFromLocalCache();
    }
  }

  public onDeleteUser(user: User): void {
    const modalRef = this.modalService.open(DeleteuserComponent);
    modalRef.componentInstance.username = user.username;
    modalRef.result.then(
      () => {
        this.getUsers(false);
      },
      () => {
      });
  }

  public onEditUser(editUser: User): void {
    const modalRef = this.modalService.open(EdituserComponent);
    modalRef.componentInstance.editUser = editUser;
    modalRef.componentInstance.currentUsername = editUser.username;
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    modalRef.result.then(
      () => {
        this.getUsers(false);
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
