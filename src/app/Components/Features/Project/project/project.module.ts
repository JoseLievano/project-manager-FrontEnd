import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../../Shared/shared-components.module';
import { RouterOutlet } from '@angular/router';
import { FormFieldsModule } from '../../../Shared/form-fields/form-fields.module';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';

@NgModule({
    declarations: [ProjectComponent, ProjectListComponent, AddNewProjectComponent],
    imports: [
        CommonModule,
        SharedComponentsModule,
        FormFieldsModule,
        RouterOutlet,
    ],
})
export class ProjectModule {}
