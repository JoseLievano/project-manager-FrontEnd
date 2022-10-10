import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeSelectorComponent} from "./theme-selector/theme-selector.component";
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    ThemeSelectorComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeSelectorComponent,
    SidebarComponent
  ]
})
export class SharedComponentsModule { }
