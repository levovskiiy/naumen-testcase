import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NotificationItemComponent,
  ],
})
export class NotificationContainerComponent {
  private readonly _notificationService = inject(NotificationService);

  public elements = computed(() => this._notificationService.notifications());
}
