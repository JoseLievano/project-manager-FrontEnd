import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexNormalComponent} from "./Components/Shared/index-normal/index-normal.component";
import {LoginComponent} from "./Components/Shared/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./Components/Shared/dashboard/dashboard.component";
import {BusinessListComponent} from "./Components/Features/HQ/business/business-list/business-list.component";
import {SharedComponentsModule} from "./Components/Shared/shared-components.module";
import {AuthUserGuard} from "./Guards/auth-user.guard";

const routes: Routes = [
  {path: '', component: IndexNormalComponent, canActivate: [AuthUserGuard],children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'business', component: BusinessListComponent}
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    IndexNormalComponent,
    LoginComponent,
    ],
    imports: [RouterModule.forRoot(routes), ReactiveFormsModule, SharedComponentsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
