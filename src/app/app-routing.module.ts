import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexNormalComponent} from "./Components/Shared/index-normal/index-normal.component";
import {LoginComponent} from "./Components/Shared/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: IndexNormalComponent},
];

@NgModule({
  declarations: [IndexNormalComponent, LoginComponent],
  imports: [RouterModule.forRoot(routes, {enableTracing: true}), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
