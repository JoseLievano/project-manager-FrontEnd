import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BusinessListComponent} from "./business-list/business-list.component";
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import { BusinessComponent } from './business/business.component';
import {RouterOutlet} from "@angular/router";
import { AddNewBusinessComponent } from './add-new-business/add-new-business.component';


@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessComponent,
    AddNewBusinessComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterOutlet
  ]
})
export class BusinessComponentsModule { }
