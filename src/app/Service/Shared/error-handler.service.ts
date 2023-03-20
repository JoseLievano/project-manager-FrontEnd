import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private errorMessage : string = "";

  private alertIsVisible : boolean = false;

  constructor(
    private router : Router,
    private loginService : LoginService
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
    console.log(errorMessage);
  }

  private clearUser(){
    console.log("Clearing user data");
    this.loginService.doLogout();
  }

}
