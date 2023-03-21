import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {UiMessage} from "../../Model/Shared/ui-message";
import {messageType} from "../../Constant/messageType";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router : Router,
    private loginService : LoginService,
    private alertService : AlertService
  ) { }

  public processError(actualError : Error) : void{
    this.errorFilter(actualError.message);
  }

  private errorFilter(errorMessage : string){

    if (errorMessage === "Invalid Token received!"){
      this.showErrorMessageUI(errorMessage);
      this.clearUser();
    }

  }

  private showErrorMessageUI(errorMessage : string){
    let errorAlert = new UiMessage(errorMessage, messageType.ERROR);
    this.alertService.addNewAlert(errorAlert);
  }

  private clearUser(){
    this.loginService.doLogout();
  }

}
