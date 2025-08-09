import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

let globalCounter = 0;

const DEFAULT_DURATION = 2000;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notifications = signal<Notification[]>([]);

  constructor() {
  }

  public show(message: string, variant: NotificationVariant, duration = DEFAULT_DURATION): Observable<void> {
    const notification = {
      id: globalCounter++,
      message,
      variant,
      duration,
      closeSubject: new Subject<void>(),
      onClose: () => {
        this.remove(notification);
      }
    };

    if (duration && duration > 0) {
      setTimeout(() => this.remove(notification), duration);
    }

    this.notifications.update((value) => [ ...value, notification ]);
    return notification.closeSubject.asObservable();
  }

  public success(message: string, duration = DEFAULT_DURATION): Observable<void> {
    return this.show(message, 'success', duration);
  }

  public error(message: string, duration = DEFAULT_DURATION): Observable<void> {
    return this.show(message, 'error', duration);
  }

  private remove(item: Notification): void {
    this.notifications.update((value) => {
      return value.filter((not) => not.id !== item.id);
    });

    item.closeSubject.next();
    item.closeSubject.complete();
  }
}

export interface Notification {
  id: number;
  message: string;
  variant: NotificationVariant;
  duration: number;
  closeSubject: Subject<void>;
  onClose: () => void;
}

export type NotificationVariant = 'success' | 'error';
