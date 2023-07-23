import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBsTaskCategoryComponent } from './edit-bs-task-category/edit-bs-task-category.component';
import { BsTaskCategoryComponent } from './bs-task-category/bs-task-category.component';
import { AddNewBsTaskCategoryComponent } from './add-new-bs-task-category/add-new-bs-task-category.component';
import { BsTaskCategoryListComponent } from './bs-task-category-list/bs-task-category-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormFieldsModule} from "../../../Shared/form-fields/form-fields.module";



@NgModule({
  declarations: [
    EditBsTaskCategoryComponent,
    BsTaskCategoryComponent,
    AddNewBsTaskCategoryComponent,
    BsTaskCategoryListComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FormFieldsModule
    ]
})
export class BsTaskCategoryModule { }
