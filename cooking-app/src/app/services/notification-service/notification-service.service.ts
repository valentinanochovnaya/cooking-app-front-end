import { Injectable } from '@angular/core';
import { NotificationsService } from "angular2-notifications";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifyService: NotificationsService) { }

  onSuccess(message: string) {
    this.notifyService.success('Success', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fromLeft',
      showProgressBar: false,
      icons: 'success'
    });
  }
}
