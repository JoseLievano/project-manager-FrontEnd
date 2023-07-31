import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../../Shared/shared-components.module';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { FormFieldsModule } from '../../../Shared/form-fields/form-fields.module';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [{ path: '', component: ProjectListComponent }];

@NgModule({
    declarations: [ProjectComponent, ProjectListComponent],
    imports: [
        CommonModule,
        SharedComponentsModule,
        FormFieldsModule,
        RouterOutlet,
        RouterModule.forChild(routes),
    ],
})
export class ProjectModule {}
