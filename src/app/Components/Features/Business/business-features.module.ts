import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessComponentsModule} from "./business/business-components.module";
import {BsDocComponentsModule} from "./bsDoc/bs-doc-components.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BusinessComponentsModule,
    BsDocComponentsModule
  ],
  exports: [
    BusinessComponentsModule,
    BsDocComponentsModule
  ]
})
export class BusinessFeaturesModule { }
