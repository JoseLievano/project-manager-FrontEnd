import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexNormalComponent} from "./Components/Shared/index-normal/index-normal.component";
import {LoginComponent} from "./Components/Shared/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./Components/Shared/dashboard/dashboard.component";
import {BusinessListComponent} from "./Components/Features/Business/business/business-list/business-list.component";
import {SharedComponentsModule} from "./Components/Shared/shared-components.module";
import {AuthUserGuard} from "./Guards/auth-user.guard";
import {Paths} from "./Constant/paths";
import {BsDocListComponent} from "./Components/Features/Business/bsDoc/bs-doc-list/bs-doc-list.component";
import {AddNewBsDocComponent} from "./Components/Features/Business/bsDoc/add-new-bs-doc/add-new-bs-doc.component";
import {BsDocComponent} from "./Components/Features/Business/bsDoc/bs-doc/bs-doc.component";
import {BusinessComponent} from "./Components/Features/Business/business/business/business.component";
import {
  AddNewBusinessComponent
} from "./Components/Features/Business/business/add-new-business/add-new-business.component";
import {
  BsDocCategoryComponent
} from "./Components/Features/Business/bsDocCategory/bs-doc-category/bs-doc-category.component";
import {
  AddNewBsDocCategoryComponent
} from "./Components/Features/Business/bsDocCategory/add-new-bs-doc-category/add-new-bs-doc-category.component";
import {ViewDocComponent} from "./Components/Features/Business/bsDoc/view-doc/view-doc.component";
import {EditBsDocComponent} from "./Components/Features/Business/bsDoc/edit-bs-doc/edit-bs-doc.component";
import {BsKbComponent} from "./Components/Features/Business/bsKB/bs-kb/bs-kb.component";
import {BsKbListComponent} from "./Components/Features/Business/bsKB/bs-kb-list/bs-kb-list.component";
import {AddNewBsKbComponent} from "./Components/Features/Business/bsKB/add-new-bs-kb/add-new-bs-kb.component";
import {ViewKbComponent} from "./Components/Features/Business/bsKB/view-kb/view-kb.component";
import {EditBsKbComponent} from "./Components/Features/Business/bsKB/edit-bs-kb/edit-bs-kb.component";
import {BsStatusComponent} from "./Components/Features/Business/bsStatus/bs-status/bs-status.component";
import {BsStatusListComponent} from "./Components/Features/Business/bsStatus/bs-status-list/bs-status-list.component";

const routes: Routes = [
  {path: '', component: IndexNormalComponent, canActivate: [AuthUserGuard],children: [
      {path: Paths.DASHBOARD.path, component: DashboardComponent},
      {path: Paths.BUSINESS.path, component: BusinessComponent, children: [
          {path: "", component: BusinessListComponent},
          {path: "new", component: AddNewBusinessComponent}
        ]
      },
      {path: Paths.BS_DOCS_CATEGORY.path, component: BsDocCategoryComponent, children: [
          {path: "new", component: AddNewBsDocCategoryComponent}
        ]
      },
      {path: Paths.BS_DOC.path, component: BsDocComponent, children: [
          {path: "", component: BsDocListComponent},
          {path: "new", component: AddNewBsDocComponent},
          {path: "view/" + ":id", component: ViewDocComponent},
          {path: "edit/" + ":id", component: EditBsDocComponent}
        ]
      },
      {path : Paths.BS_KB.path, component : BsKbComponent, children : [
          {path: "", component: BsKbListComponent},
          {path: "new", component: AddNewBsKbComponent},
          {path: "view/" + ":id", component: ViewKbComponent},
          {path: "edit/" + ":id", component: EditBsKbComponent}
        ]
      },
      {path : Paths.BS_STATUS.path, component : BsStatusComponent, children : [
          {path: "", component: BsStatusListComponent}
        ]
      }
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    IndexNormalComponent,
    LoginComponent,
    ],
    imports: [RouterModule.forRoot(routes), ReactiveFormsModule, SharedComponentsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
