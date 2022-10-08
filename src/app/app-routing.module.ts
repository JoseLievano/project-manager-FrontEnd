import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexNormalComponent} from "./Components/Shared/index-normal/index-normal.component";
import {LoginComponent} from "./Components/Shared/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ThemeSelectorComponent} from "./Components/Shared/theme-selector/theme-selector.component";

const routes: Routes = [
  {path: '', component: IndexNormalComponent},
];

@NgModule({
  declarations: [
    IndexNormalComponent,
    LoginComponent,
    ThemeSelectorComponent],
  imports: [RouterModule.forRoot(routes, {enableTracing: true}), ReactiveFormsModule],
  exports: [RouterModule, ThemeSelectorComponent]
})
export class AppRoutingModule { }
