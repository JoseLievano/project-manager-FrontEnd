import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../../Model/Shared/User";
import {Const} from "../../Constant/const";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private actualUser : User = new User();

  constructor(private http : HttpClient, private router : Router) { }

  doLogin(user: User) {

    this.validateLoginDetails(user).subscribe({
      next: (response) =>{this.saveLoginDetails(response)},
      error: (error) => {console.log(error)},
      complete: () => {

        let role : String = "";

        if (this.actualUser != null){
          // @ts-ignore
          role = this.actualUser.roles[0];

          if (role === "ROLE_BS_CLIENT"){
            this.router.navigate(["dashboard/business_client"]);
          }else if(role === "ROLE_CLIENT"){
            this.router.navigate(["dashboard/client"]);
          }
        }
      }
    })

  }

  private validateLoginDetails(user: User) {
    window.sessionStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.get(Const.API_URL + Const.LOGIN, { observe: 'response',withCredentials: true });
  }

  private saveLoginDetails(response : HttpResponse<Object>){

    let token : String | null = response.headers.get('Authorization')

    // @ts-ignore
    window.sessionStorage.setItem("Authorization",token);

    this.actualUser = <any> response.body;

    /*this.actualUser.authStatus = 'AUTH';*/
    // @ts-ignore
    this.actualUser.role = response.body.roles[0].authority;

    window.sessionStorage.setItem("userdetails",JSON.stringify(this.actualUser));
  }

  getActualUser(){

    // @ts-ignore
    let userdetailsLenght : number | null = window.sessionStorage.getItem("userdetails").length;

    if (userdetailsLenght != null && userdetailsLenght > 0){
      this.actualUser = JSON.parse(<string> window.sessionStorage.getItem("userdetails"));
    }else{
      this.router.navigate([""]);
    }
/*
    console.log("get actual user login service: " + this.actualUser.username)*/
    return this.actualUser;
  }

}
