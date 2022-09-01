import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Category } from 'src/app/shared/model/category';
import { CategoryService } from 'src/app/shared/service/category.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit, OnDestroy {
  @Input() editCategory!: Category;
  @Input() currentName!: string;
  public categoryImage!: any;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public fileName!: any;
  public files: any;

  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public onUpdateCategory(): void {
    const formData = this.categoryService.createCategoryFormDate(this.currentName, this.editCategory, this.categoryImage);
    this.subscriptions.push(
      this.categoryService.updateCategory(formData).subscribe(
        (response: Category) => {
          this.fileName = null;
          this.categoryImage = null;
          this.activeModal.close('Ok click')
          this.sendNotification(NotificationType.SUCCESS, `${response.name} updated successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.categoryImage = null;
        }
      )
      );
  }

  public onCategoryImageChange(event: any): void {
    const filesEvent = Object.keys(event.target.files).map((key: any) => event.target.files[key]);
    this.files = filesEvent[0];
    this.fileName =  this.files.name;
    this.categoryImage = this.files;
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
