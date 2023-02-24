import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BusinessListComponent} from "./business-list/business-list.component";
import {SharedComponentsModule} from "../../../Shared/shared-components.module";


@NgModule({
  declarations: [
    BusinessListComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class BusinessComponentsModule { }
