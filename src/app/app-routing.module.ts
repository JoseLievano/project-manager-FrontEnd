import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexNormalComponent} from "./Components/Shared/index-normal/index-normal.component";
import {LoginComponent} from "./Components/Shared/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./Components/Shared/dashboard/dashboard.component";
import {BusinessListComponent} from "./Components/Features/Business/business/business-list/business-list.component";
import {SharedComponentsModule} from "./Components/Shared/shared-components.module";
import {AuthUserGuard} from "./Guards/auth-user.guard";
import {Paths} from "./Constant/paths";
import {BsDocListComponent} from "./Components/Features/Business/bsDoc/bs-doc-list/bs-doc-list.component";

const routes: Routes = [
  {path: '', component: IndexNormalComponent, canActivate: [AuthUserGuard],children: [
      {path: Paths.DASHBOARD.path, component: DashboardComponent},
      {path: Paths.BUSINESS.path, component: BusinessListComponent},
      {path: Paths.BS_DOC.path, component: BsDocListComponent}
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
