import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {JWTInterceptorInterceptor} from "./Interceptor/jwtinterceptor.interceptor";
import {FeaturesModule} from "./Components/Features/features.module";
import {AuthUserGuard} from "./Guards/auth-user.guard";
import {SharedComponentsModule} from "./Components/Shared/shared-components.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


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
        FeaturesModule,
        SharedComponentsModule,
        BrowserAnimationsModule,
        FontAwesomeModule
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
