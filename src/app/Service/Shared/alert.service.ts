import { Injectable } from '@angular/core';
import {UiMessage} from "../../Model/Shared/ui-message";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alerts : UiMessage[] = [];

  private alertsChanged : Subject<UiMessage[]> = new Subject<UiMessage[]>();

  constructor() {  }

  public getAlerts() : Observable<UiMessage[]>{
    return this.alertsChanged.asObservable();
  }

  public addNewAlert(newAlert : UiMessage) : void {
    this.alerts.unshift(newAlert);
    this.alertsChanged.next(this.alerts);
  }

  public removeAlert(toRemove : UiMessage) : void {
    let toRemoveIndex = this.alerts.indexOf(toRemove);
    this.alerts.splice(toRemoveIndex, 1);
    this.alertsChanged.next(this.alerts);
  }

}
