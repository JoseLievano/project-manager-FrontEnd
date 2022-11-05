import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../Service/Shared/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

  constructor(private loginService : LoginService, private router : Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("AuthUserGuard");
    let isUserLoggedIn : boolean = this.loginService.isUserLoggedIn();

    console.log("guard: " + isUserLoggedIn);

    if (isUserLoggedIn){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }

  }

}
