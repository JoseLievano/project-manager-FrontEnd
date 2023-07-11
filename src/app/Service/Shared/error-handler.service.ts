import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {UiMessage} from "../../Model/Shared/ui-message";
import {messageType} from "../../Constant/messageType";
import {AlertService} from "./alert.service";
import {errorMessages} from "../../Constant/errorMessages";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router : Router,
    private loginService : LoginService,
    private alertService : AlertService
  ) { }

  public processError(actualError : any) : void{

    if (actualError.error){
      this.errorFilter(actualError.error.message);
    }else{
      this.errorFilter(actualError.message);
    }

  }

  private errorFilter(errorMessage : string){

    switch (errorMessage){
      case errorMessages.INVALID_TOKEN : {
        this.showErrorMessageUI(errorMessage);
        this.clearUser();
        break;
      }
      case errorMessages.FORBIDDEN : {
        this.showErrorMessageUI(errorMessage);
        this.router.navigate([""]);
        break;
      }
      default : {
        this.showErrorMessageUI(errorMessage);
        break;
      }
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
