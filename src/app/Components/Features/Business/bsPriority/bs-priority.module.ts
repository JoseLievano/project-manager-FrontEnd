import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsPriorityComponent } from './bs-priority/bs-priority.component';
import { AddNewBsPriorityComponent } from './add-new-bs-priority/add-new-bs-priority.component';
import { BsPriorityListComponent } from './bs-priority-list/bs-priority-list.component';
import { EditBsPriorityComponent } from './edit-bs-priority/edit-bs-priority.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import {
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList,
} from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormFieldsModule } from '../../../Shared/form-fields/form-fields.module';

@NgModule({
    declarations: [
        BsPriorityComponent,
        AddNewBsPriorityComponent,
        BsPriorityListComponent,
        EditBsPriorityComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DndModule,
        CdkDropList,
        CdkDrag,
        CdkDragPlaceholder,
        FontAwesomeModule,
        FormsModule,
        FormFieldsModule,
    ],
})
export class BsPriorityModule {}
