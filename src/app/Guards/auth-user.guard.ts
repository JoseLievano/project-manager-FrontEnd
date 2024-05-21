import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../Service/Shared/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard  {

  constructor(private loginService : LoginService, private router : Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isUserLoggedIn : boolean = this.loginService.isUserLoggedIn();

    if (isUserLoggedIn){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }

  }

}
