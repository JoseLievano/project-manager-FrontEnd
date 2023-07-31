import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { IndexNormalComponent } from './Components/Shared/index-normal/index-normal.component';
import { LoginComponent } from './Components/Shared/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Components/Shared/dashboard/dashboard.component';
import { SharedComponentsModule } from './Components/Shared/shared-components.module';
import { AuthUserGuard } from './Guards/auth-user.guard';
import { Paths } from './Constant/paths';
import { BsDocComponent } from './Components/Features/Business/bsDoc/bs-doc/bs-doc.component';
import { BusinessComponent } from './Components/Features/Business/business/business/business.component';
import { BsDocCategoryComponent } from './Components/Features/Business/bsDocCategory/bs-doc-category/bs-doc-category.component';
import { BsKbComponent } from './Components/Features/Business/bsKB/bs-kb/bs-kb.component';
import { BsStatusComponent } from './Components/Features/Business/bsStatus/bs-status/bs-status.component';
import { BsStatusListComponent } from './Components/Features/Business/bsStatus/bs-status-list/bs-status-list.component';
import { BsTaskCategoryComponent } from './Components/Features/Business/bsTaskCategory/bs-task-category/bs-task-category.component';
import { BsTypeComponent } from './Components/Features/Business/bsType/bs-type/bs-type.component';
import { BsPriorityComponent } from './Components/Features/Business/bsPriority/bs-priority/bs-priority.component';
import { BsClientComponent } from './Components/Features/Business/bsClient/bs-client/bs-client.component';
import { ProjectComponent } from './Components/Features/Project/project/project/project.component';

const routes: Routes = [
    {
        path: '',
        component: IndexNormalComponent,
        canActivate: [AuthUserGuard],
        children: [
            { path: Paths.DASHBOARD.path, component: DashboardComponent },
            {
                path: Paths.BUSINESS.path,
                component: BusinessComponent,
                loadChildren: () =>
                    import(
                        './Components/Features/Business/business-features.module'
                    ).then((m) => m.BusinessFeaturesModule),
            },
            {
                path: Paths.BS_DOCS_CATEGORY.path,
                component: BsDocCategoryComponent,
                loadChildren: () =>
                    import(
                        './Components/Features/Business/bsDocCategory/bs-doc-category-components.module'
                    ).then((m) => m.BsDocCategoryComponentsModule),
            },
            {
                path: Paths.BS_DOC.path,
                component: BsDocComponent,
                loadChildren: () =>
                    import(
                        './Components/Features/Business/bsDoc/bs-doc-components.module'
                    ).then((m) => m.BsDocComponentsModule),
            },
            {
                path: Paths.BS_KB.path,
                component: BsKbComponent,
                loadChildren: () =>
                    import(
                        './Components/Features/Business/bsKB/bs-kb-components.module'
                    ).then((m) => m.BsKbComponentsModule),
            },
            {
                path: Paths.BS_STATUS.path,
                component: BsStatusComponent,
                children: [{ path: '', component: BsStatusListComponent }],
            },
            {
                path: Paths.BS_TASK_CATEGORY.path,
                component: BsTaskCategoryComponent,
            },
            { path: Paths.BS_TYPE.path, component: BsTypeComponent },
            { path: Paths.BS_PRIORITY.path, component: BsPriorityComponent },
            {
                path: Paths.BS_CLIENT.path,
                component: BsClientComponent,
                loadChildren: () =>
                    import(
                        './Components/Features/Business/bsClient/bs-client-components.module'
                    ).then((m) => m.BsClientComponentsModule),
            },
            {
                path: Paths.BS_PROJECT.path,
                component: ProjectComponent,
                loadChildren: () =>
                    import(
                        './Components/Features/Project/project/project.module'
                    ).then((m) => m.ProjectModule),
            },
        ],
    },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    declarations: [IndexNormalComponent, LoginComponent],
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
        ReactiveFormsModule,
        SharedComponentsModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
