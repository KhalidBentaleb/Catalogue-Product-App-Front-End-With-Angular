import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Category } from 'src/app/shared/model/category';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AddcategoryComponent } from '../../modals/addcategory/addcategory.component';
import { DeletecategoryComponent } from '../../modals/deletecategory/deletecategory.component';
import { EditcategoryComponent } from '../../modals/editcategory/editcategory.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public categories!: Category[] | null;
  public category!: Category;
  public refreshing!: boolean;
  public selectedCategory!: Category;
  private subscriptions: Subscription[] = [];
  public editCategory = new Category();
  private currentName!: string;

  constructor(private router: Router, private authenticationService: AuthenticationService, private modalService: NgbModal,
              private categoryService: CategoryService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getCategories(true);
  }

  public getCategories(showNotification: boolean): void {
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe(
        (response: Category[]) => {
          this.categories = response;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} categorie(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public onAddNewCategory(): void {
    const modalRef = this.modalService.open(AddcategoryComponent);
    modalRef.result.then(
      () => {
        this.getCategories(false);
      },
      () => {
      });
  }

  public onDeleteCategory(category: Category): void {
    const modalRef = this.modalService.open(DeletecategoryComponent);
    modalRef.componentInstance.name = category.name;
    modalRef.result.then(
      () => {
        this.getCategories(false);
      },
      () => {
      });
  }

  public onEditCategory(editCategory: Category): void {
    const modalRef = this.modalService.open(EditcategoryComponent);
    modalRef.componentInstance.editCategory = editCategory;
    modalRef.componentInstance.currentName = editCategory.name;
    this.editCategory = editCategory;
    this.currentName = editCategory.name;
    modalRef.result.then(
      () => {
        this.getCategories(false);
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
