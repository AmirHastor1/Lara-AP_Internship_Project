import { Component, Input } from '@angular/core';
import { NotificationInfo } from 'src/app/Models/notification.model';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})
export class NotificationDropdownComponent {
  @Input() notifications: NotificationInfo[] = [];
}
