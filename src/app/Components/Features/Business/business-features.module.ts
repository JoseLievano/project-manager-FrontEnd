import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessComponentsModule} from "./business/business-components.module";
import {BsDocComponentsModule} from "./bsDoc/bs-doc-components.module";
import {BsDocCategoryComponentsModule} from "./bsDocCategory/bs-doc-category-components.module";
import {BsKbComponentsModule} from "./bsKB/bs-kb-components.module";
import {BsStatusModule} from "./bsStatus/bs-status.module";
import {BsTaskCategoryModule} from "./bsTaskCategory/bs-task-category.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BusinessComponentsModule,
    BsDocComponentsModule,
    BsDocCategoryComponentsModule,
    BsKbComponentsModule,
    BsStatusModule,
    BsTaskCategoryModule
  ],
  exports: [
    BusinessComponentsModule,
    BsDocComponentsModule,
    BsDocCategoryComponentsModule,
    BsKbComponentsModule,
    BsTaskCategoryModule
  ]
})
export class BusinessFeaturesModule { }
