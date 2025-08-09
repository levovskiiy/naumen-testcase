import { Component } from '@angular/core';
import {
  NotificationContainerComponent
} from './shared/ui/notification/notification-container/notification-container.component';
import { UserTableComponent } from './user/user-table/user-table.component';

@Component({
  selector: 'app-root',
  imports: [
    UserTableComponent,
    NotificationContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'naumen-testcase';
}
