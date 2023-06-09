import { Component, OnInit } from '@angular/core';
import {UiMessage} from "../../../Model/Shared/ui-message";
import {AlertService} from "../../../Service/Shared/alert.service";
import {Subscription} from "rxjs";
import {messageType} from "../../../Constant/messageType";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  public alerts : UiMessage[] = [];

  private alertSubscription : Subscription;

  constructor(
    private alertService : AlertService
  ) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getAlertsObservable().subscribe((updatedAlerts) => {
      this.alerts = updatedAlerts;
    })
  }

  public deleteAlert(alert : UiMessage) : void{
    this.alertService.removeAlert(alert);
    this.alerts = this.alertService.getAlertsNorm();
  }

    protected readonly messageType = messageType;
}
