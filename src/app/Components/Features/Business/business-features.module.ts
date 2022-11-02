import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BusinessComponentsModule} from "./business/business-components.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BusinessComponentsModule
  ],
  exports: [
    BusinessComponentsModule
  ]
})
export class BusinessFeaturesModule { }
