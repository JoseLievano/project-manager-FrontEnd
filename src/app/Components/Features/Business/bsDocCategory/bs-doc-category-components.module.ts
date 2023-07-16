import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { BsDocCategoryComponent } from './bs-doc-category/bs-doc-category.component';
import { AddNewBsDocCategoryComponent } from './add-new-bs-doc-category/add-new-bs-doc-category.component';

const routes: Routes = [
  {path : "new", component : AddNewBsDocCategoryComponent}
]

@NgModule({
    declarations: [
        BsDocCategoryComponent,
        AddNewBsDocCategoryComponent
    ],
    exports: [
        AddNewBsDocCategoryComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouterOutlet,
        RouterModule.forChild(routes)
    ]
})
export class BsDocCategoryComponentsModule { }
