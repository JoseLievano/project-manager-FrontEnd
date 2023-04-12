import { Injectable } from '@angular/core';
import {UiMessage} from "../../Model/Shared/ui-message";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alerts : UiMessage[] = [];

  private alertSubject : Subject<UiMessage[]> = new Subject<UiMessage[]>();

  constructor() {
    window.localStorage.setItem("alerts", "");
  }

  public getAlertsObservable() : Observable<UiMessage[]>{
    return this.alertSubject.asObservable();
  }

  public addNewAlert(newAlert : UiMessage) : void {
    this.updateAlerts();
    this.alerts.push(newAlert);
    window.localStorage.setItem("alerts", JSON.stringify(this.alerts));
    this.alertSubject.next(this.alerts);
  }

  public removeAlert(toRemove : UiMessage) : void {
    this.updateAlerts();
    let toRemoveIndex = this.alerts.indexOf(toRemove);
    this.alerts.splice(toRemoveIndex, 1);
    window.localStorage.setItem("alerts", JSON.stringify(this.alerts));
    this.alertSubject.next(this.alerts);
  }

  public getAlertsNorm() : UiMessage[]{
    this.updateAlerts();
    return this.alerts;
  }

  private updateAlerts() : void {
    let alertsLength : number | undefined = window.localStorage.getItem("alerts")?.length;
    if (alertsLength !== undefined && alertsLength > 0){
      this.alerts = JSON.parse(<string> window.localStorage.getItem("alerts"));
    }
  }

}
