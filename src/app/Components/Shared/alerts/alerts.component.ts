import { Component, OnInit } from '@angular/core';
import {UiMessage} from "../../../Model/Shared/ui-message";
import {AlertService} from "../../../Service/Shared/alert.service";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  public alerts : UiMessage[] = [];

  constructor(
    private alertService : AlertService
  ) { }

  ngOnInit(): void {
    this.alerts = this.alertService.getAlertsNorm();
  }

  public deleteAlert(alert : UiMessage) : void{
    this.alertService.removeAlert(alert);
    this.alerts = this.alertService.getAlertsNorm();
  }

}
