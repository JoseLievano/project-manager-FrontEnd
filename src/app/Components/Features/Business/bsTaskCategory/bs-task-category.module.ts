import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBsTaskCategoryComponent } from './edit-bs-task-category/edit-bs-task-category.component';
import { BsTaskCategoryComponent } from './bs-task-category/bs-task-category.component';
import { AddNewBsTaskCategoryComponent } from './add-new-bs-task-category/add-new-bs-task-category.component';
import { BsTaskCategoryListComponent } from './bs-task-category-list/bs-task-category-list.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditBsTaskCategoryComponent,
    BsTaskCategoryComponent,
    AddNewBsTaskCategoryComponent,
    BsTaskCategoryListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class BsTaskCategoryModule { }
