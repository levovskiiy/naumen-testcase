import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Notification } from '../notification.service';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationItemComponent {
  public data = input.required<Notification>();

  public close(): void {
    this.data().onClose();
  }
}
