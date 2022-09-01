import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/shared/model/custom-http-response';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {
  @Input() username: any;

  constructor(public modal: NgbActiveModal, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onDeleteUser() {
    this.userService.deleteUser(this.username).subscribe(
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
