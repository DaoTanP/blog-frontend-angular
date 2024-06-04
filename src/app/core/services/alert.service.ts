import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { AlertType } from '@/shared/constants/alert-type.enum';
import { Alert } from '@/core/models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertQueue: Alert[] = [];
  private alertSubject: Subject<Alert[]> = new Subject<Alert[]>();
  private showAfterRedirect: boolean = false;

  constructor(private router: Router) {
    this.alertSubject.next(this.alertQueue);
    // clear alert messages on route change unless 'showAfterRedirect' flag is true
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.showAfterRedirect) {
          // only keep for a single route change
          this.showAfterRedirect = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  onAlert(): Observable<Alert[]> {
    return this.alertSubject.asObservable();
  }

  push(
    message: string,
    type: AlertType = AlertType.ERROR,
    removeAfterSecond: number = 0,
    showAfterRedirect = false
  ) {
    this.showAfterRedirect = showAfterRedirect;
    this.alertQueue.push({ type, message });
    this.alertSubject.next(this.alertQueue);

    if (removeAfterSecond > 0) {
      setTimeout(() => {
        this.remove(this.alertQueue.length - 1);
      }, removeAfterSecond * 1000);
    }
  }

  clear() {
    this.alertQueue = [];
    this.alertSubject.next(this.alertQueue);
  }

  remove(index: number) {
    this.alertQueue.splice(index, 1);
    this.alertSubject.next(this.alertQueue);
  }
}
