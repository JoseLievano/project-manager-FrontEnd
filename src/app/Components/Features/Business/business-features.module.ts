import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessComponentsModule} from "./business/business-components.module";
import {BsDocComponentsModule} from "./bsDoc/bs-doc-components.module";
import {BsDocCategoryComponentsModule} from "./bsDocCategory/bs-doc-category-components.module";
import {BsKbComponentsModule} from "./bsKB/bs-kb-components.module";
import {BsStatusModule} from "./bsStatus/bs-status.module";
import {BsTaskCategoryModule} from "./bsTaskCategory/bs-task-category.module";
import {BsTypeModule} from "./bsType/bs-type.module";
import {BsPriorityModule} from "./bsPriority/bs-priority.module";
import {BsClientComponentsModule} from "./bsClient/bs-client-components.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BusinessComponentsModule,
    BsClientComponentsModule,
    BsDocComponentsModule,
    BsDocCategoryComponentsModule,
    BsKbComponentsModule,
    BsStatusModule,
    BsTaskCategoryModule,
    BsTypeModule,
    BsPriorityModule
  ],
  exports: [
    BusinessComponentsModule,
    BsClientComponentsModule,
    BsDocComponentsModule,
    BsDocCategoryComponentsModule,
    BsKbComponentsModule,
    BsTaskCategoryModule,
    BsTypeModule,
    BsPriorityModule
  ]
})
export class BusinessFeaturesModule { }
