import { NgModule } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {ClientIndexComponent} from "./Client/client-index/client-index.component";
import {AppRoutingModule} from "../../app-routing.module";
import {SharedComponentsModule} from "../Shared/shared-components.module";
import { ClientBusinessComponent } from './Client/client-business/client-business.component';
import {Routes, RouterModule} from "@angular/router";
import { ClientDashboardComponent } from './Client/client-dashboard/client-dashboard.component';

/*const routes: Routes = [
  {path: 'business', component: ClientBusinessComponent}
]*/

@NgModule({
  declarations: [ClientIndexComponent, ClientBusinessComponent, ClientDashboardComponent],
  imports: [
    CommonModule,
    NgClass,
    AppRoutingModule,
    SharedComponentsModule/*
    RouterModule.forChild(routes)*/
  ]
})
export class HQModule { }
