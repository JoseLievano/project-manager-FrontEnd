import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeSelectorComponent} from "./theme-selector/theme-selector.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [
    ThemeSelectorComponent,
    SidebarComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopBarComponent,
    ThemeSelectorComponent,
    SidebarComponent
  ]
})
export class SharedComponentsModule { }
