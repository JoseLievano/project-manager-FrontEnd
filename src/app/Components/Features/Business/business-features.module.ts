import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessComponentsModule} from "./business/business-components.module";
import {BsDocComponentsModule} from "./bsDoc/bs-doc-components.module";
import {BsDocCategoryComponentsModule} from "./bsDocCategory/bs-doc-category-components.module";
import {BsKbComponentsModule} from "./bsKB/bs-kb-components.module";
import {BsStatusModule} from "./bsStatus/bs-status.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BusinessComponentsModule,
    BsDocComponentsModule,
    BsDocCategoryComponentsModule,
    BsKbComponentsModule,
    BsStatusModule
  ],
  exports: [
    BusinessComponentsModule,
    BsDocComponentsModule,
    BsDocCategoryComponentsModule,
    BsKbComponentsModule
  ]
})
export class BusinessFeaturesModule { }
