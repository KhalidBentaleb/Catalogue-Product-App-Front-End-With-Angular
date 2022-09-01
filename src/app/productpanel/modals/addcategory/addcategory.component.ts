import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Category } from 'src/app/shared/model/category';
import { CategoryService } from 'src/app/shared/service/category.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public categoryImage!: File;
  public fileName!: string;
  public files: any;

  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public saveNewCategory(): void {
    this.clickButton('new-category-save');
  }

  public onAddNewCategory(categoryForm: NgForm): void {
    const formData = this.categoryService.createCategoryFormDate("", categoryForm.value, this.categoryImage);
    this.subscriptions.push(
      this.categoryService.addCategory(formData).subscribe(
        (response: Category) => {
          categoryForm.reset();
          this.activeModal.close('Ok click')
          this.sendNotification(NotificationType.SUCCESS, `${response.name} added successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
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

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
