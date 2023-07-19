import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeSelectorComponent} from "./theme-selector/theme-selector.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterOutlet} from "@angular/router";
import { LogoutBtnTopComponent } from './logout-btn-top/logout-btn-top.component';
import { TableViewComponent } from './table-view/table-view.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { CategoryAddNewComponent } from './category-add-new/category-add-new.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ContentModule} from "./content/content.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    ThemeSelectorComponent,
    SidebarComponent,
    TopBarComponent,
    DashboardComponent,
    LogoutBtnTopComponent,
    TableViewComponent,
    AlertsComponent,
    CategoryViewComponent,
    CategoryAddNewComponent,
  ],
  imports: [
    ContentModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    TopBarComponent,
    ThemeSelectorComponent,
    SidebarComponent,
    TableViewComponent,
    AlertsComponent,
    CategoryViewComponent,
    CategoryAddNewComponent,
  ]
})
export class SharedComponentsModule { }
