import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../../Model/Shared/User";
import {Const} from "../../Constant/const";
import {Router} from "@angular/router";
import {RoleService} from "./role.service";
import {userRole} from "../../Constant/userRole";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private actualUser : User | null;

  constructor(private http : HttpClient,
              private router : Router,
              private roleService : RoleService) { }

  doLogin(user: User) {
    this.validateLoginDetails(user).subscribe({
      next: (response) =>{this.saveLoginDetails(response)},
      error: (error) => {

      },
      complete: () => {

        let role : String = "";

        if (this.actualUser != null){
          // @ts-ignore
          role = this.actualUser.roles[0];
          // @ts-ignore
          this.roleService.setInitialLocalStorageBusiness(role);

          if (role != null){
            this.router.navigate([""]);
          }
        }
      }
    })

  }

  private validateLoginDetails(user: User) {
    window.localStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.get(Const.API_URL + Const.LOGIN, { observe: 'response',withCredentials: true });
  }

  private saveLoginDetails(response : HttpResponse<Object>){

    let token : String | null = response.headers.get('Authorization')

    // @ts-ignore
    window.localStorage.setItem("Authorization",token);

    this.actualUser = <any> response.body;

    // @ts-ignore
    this.actualUser.role = response.body.roles[0].authority;

    window.localStorage.setItem("userdetails",JSON.stringify(this.actualUser));


  }

  getActualUser() : User | null{

    let userDetailsLength : number | null | undefined;

    userDetailsLength = window.localStorage.getItem("userdetails")?.length;

    if (userDetailsLength != null && userDetailsLength > 0){
      this.actualUser = JSON.parse(<string> window.localStorage.getItem("userdetails"));
    }else{
      this.actualUser = null;
    }

    return this.actualUser;
  }

  public getActualUserRole() : String {
    this.getActualUser();
    if (this.actualUser?.roles[0]){
      return this.actualUser.roles[0];
    }else{
      return userRole.NO_ROLE;
    }
  }

  isUserLoggedIn() : boolean{
    return this.getActualUser() != null;
  }

  doLogout(){
    this.actualUser = new User();
    window.localStorage.removeItem("userdetails");
    window.localStorage.removeItem("Authorization");
    window.localStorage.removeItem("business");
    this.router.navigate(["login"]);
  }

}
