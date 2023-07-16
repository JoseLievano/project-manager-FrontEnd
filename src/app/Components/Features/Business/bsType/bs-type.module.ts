import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewBsTypeComponent } from './add-new-bs-type/add-new-bs-type.component';
import { BsTypeComponent } from './bs-type/bs-type.component';
import { EditBsTypeComponent } from './edit-bs-type/edit-bs-type.component';
import { BsTypeListComponent } from './bs-type-list/bs-type-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        AddNewBsTypeComponent,
        BsTypeComponent,
        EditBsTypeComponent,
        BsTypeListComponent
    ],
    exports: [
        BsTypeListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class BsTypeModule { }
