import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { Category } from 'src/app/shared/model/category';
import { CategoryService } from 'src/app/shared/service/category.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public categories!: Category[] | null;
  private subscriptions: Subscription[] = [];

  constructor(private categoryService: CategoryService, private notificationService: NotificationService,
              private router: Router) { }

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

  public onSelectCategory(selectedCategory: Category): void {
    this.router.navigateByUrl('/productpanel/category/' + selectedCategory["name"]);
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
