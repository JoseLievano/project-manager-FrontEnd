import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessComponentsModule} from "./business/business-components.module";
import {BsDocComponentsModule} from "./bsDoc/bs-doc-components.module";
import {BsDocCategoryComponentsModule} from "./bsDocCategory/bs-doc-category-components.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BusinessComponentsModule,
    BsDocComponentsModule,
    BsDocCategoryComponentsModule
  ],
  exports: [
    BusinessComponentsModule,
    BsDocComponentsModule,
    BsDocCategoryComponentsModule
  ]
})
export class BusinessFeaturesModule { }
