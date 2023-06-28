import { Component, Input } from '@angular/core';
import { NotificationInfo } from 'src/app/Models/notification.model';
import { UserDetails } from 'src/app/Models/userDetails.model';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})
export class NotificationDropdownComponent {
  @Input() notifications: NotificationInfo[] = [];
  notificationsOn :boolean=false;

  ngOnInit(): void {
    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails: UserDetails = JSON.parse(userDetailsString!!);
    this.notificationsOn=userDetails.notificationsOn;
  }
}
