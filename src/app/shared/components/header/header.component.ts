import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from '../../enum/notification-type.enum';
import { User } from '../../model/user';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  public user$!: User;

  constructor(private authenticationService: AuthenticationService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.authenticationService.getUserFromLocalCache();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  public signOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  public userProfile(): void {
    this.router.navigateByUrl('/productpanel/editprofile');
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
