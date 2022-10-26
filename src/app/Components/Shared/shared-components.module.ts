import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeSelectorComponent} from "./theme-selector/theme-selector.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterOutlet} from "@angular/router";
import { LogoutBtnTopComponent } from './logout-btn-top/logout-btn-top.component';



@NgModule({
  declarations: [
    ThemeSelectorComponent,
    SidebarComponent,
    TopBarComponent,
    DashboardComponent,
    LogoutBtnTopComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  exports: [
    TopBarComponent,
    ThemeSelectorComponent,
    SidebarComponent,
  ]
})
export class SharedComponentsModule { }
