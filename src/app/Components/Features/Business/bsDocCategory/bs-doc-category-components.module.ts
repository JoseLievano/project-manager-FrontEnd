import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import {RouterOutlet} from "@angular/router";
import { BsDocCategoryComponent } from './bs-doc-category/bs-doc-category.component';
import { AddNewBsDocCategoryComponent } from './add-new-bs-doc-category/add-new-bs-doc-category.component';



@NgModule({
  declarations: [
    BsDocCategoryComponent,
    AddNewBsDocCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterOutlet
  ]
})
export class BsDocCategoryComponentsModule { }
