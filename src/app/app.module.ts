import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {JWTInterceptorInterceptor} from "./Interceptor/jwtinterceptor.interceptor";
import {BusinessModule} from "./Components/Business/business.module";
import {FeaturesModule} from "./Components/Features/features.module";
import {AuthUserGuard} from "./Guards/auth-user.guard";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientXsrfModule,
        BusinessModule,
        FeaturesModule
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JWTInterceptorInterceptor,
        multi: true
      },
      AuthUserGuard
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
