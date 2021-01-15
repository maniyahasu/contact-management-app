import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
  successMsgListener: Subscription;
  successMessage: string;

  warningMsgListener: Subscription;
  warningMessage: string;

  errorMsgListener: Subscription;
  errorMessage: string;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.successMsgListener = this.alertService.successMessage.subscribe(alert => {
      this.successMessage = alert.message;
      if(alert.autoCollapse) {
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      }
    });
    this.warningMsgListener = this.alertService.warningMessage.subscribe(alert => {
      this.warningMessage = alert.message;
      if(alert.autoCollapse) {
        setTimeout(() => {
          this.warningMessage = null;
        }, 3000);
      }
    });
    this.errorMsgListener = this.alertService.errorMessage.subscribe(alert => {
      this.errorMessage = alert.message;
      if(alert.autoCollapse) {
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    });
  }

  ngOnDestroy(): void {
      this.successMsgListener.unsubscribe();
      this.warningMsgListener.unsubscribe();
      this.errorMsgListener.unsubscribe();
  }

}
