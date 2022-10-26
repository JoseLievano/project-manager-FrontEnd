import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {User} from "../Model/Shared/User";

@Injectable()
export class JWTInterceptorInterceptor implements HttpInterceptor {

  private user : User | null = new User();

  constructor(private route : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("interceptando")

    let httpHeaders = new HttpHeaders();

    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('userdetails'));
    if (this.user != null && this.user.password != null && this.user.username != null){

      let credentials = btoa(this.user.username + ':' + this.user.password);

      console.log("encoded data: "+ credentials)

      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + credentials);

    }

    console.log("usuario interceptado: " + this.user)

    let authorization = localStorage.getItem('Authorization');

    if (authorization != null){
      httpHeaders = httpHeaders.append('Authorization', "Bearer " + authorization);
    }

    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');

    const xhr = request.clone({
      headers: httpHeaders
    });

    return next.handle(xhr);
  }
}
