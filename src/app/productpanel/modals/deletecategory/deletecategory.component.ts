import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/shared/model/custom-http-response';
import { CategoryService } from 'src/app/shared/service/category.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-deletecategory',
  templateUrl: './deletecategory.component.html',
  styleUrls: ['./deletecategory.component.css']
})
export class DeletecategoryComponent implements OnInit {
  @Input() name: any;

  constructor(public modal: NgbActiveModal, private categoryService: CategoryService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onDeleteCategory() {
    this.categoryService.deleteCategory(this.name).subscribe(
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
