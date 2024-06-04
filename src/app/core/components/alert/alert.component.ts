import { Alert } from '@/core/models/alert.model';
import { AlertService } from '@/core/services/alert.service';
import { AlertType } from '@/shared/constants/alert-type.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  private subscription!: Subscription;
  protected alertQueue: any[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService
      .onAlert()
      .subscribe((alertQueue: Alert[]) => {
        this.alertQueue = alertQueue.map((a: any) => {
          switch (a.type) {
            case AlertType.SUCCESS:
              a.cssClass = 'alert-success';
              break;
            case AlertType.WARNING:
              a.cssClass = 'alert-warning';
              break;
            case AlertType.ERROR:
              a.cssClass = 'alert-danger';
              break;
          }
          return a;
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeAlert(index: number) {
    this.alertService.remove(index);
  }
}
