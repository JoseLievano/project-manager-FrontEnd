import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexNormalComponent} from "./Components/Shared/index-normal/index-normal.component";
import {LoginComponent} from "./Components/Shared/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./Components/Shared/dashboard/dashboard.component";
import {BsClientIndexComponent} from "./Components/Business/bsClient/bs-client-index/bs-client-index.component";
import {ClientIndexComponent} from "./Components/HQ/Client/client-index/client-index.component";

const routes: Routes = [
  {path: '', component: IndexNormalComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'business_client', component: BsClientIndexComponent},
      {path: 'client', component: ClientIndexComponent}
    ]
  }
];

@NgModule({
  declarations: [
    IndexNormalComponent,
    LoginComponent,
    ],
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
