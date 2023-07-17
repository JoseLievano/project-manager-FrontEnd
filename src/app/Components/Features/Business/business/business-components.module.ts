import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BusinessListComponent} from "./business-list/business-list.component";
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import { BusinessComponent } from './business/business.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { AddNewBusinessComponent } from './add-new-business/add-new-business.component';

const routes: Routes = [
  {path : "", component : BusinessListComponent},
  {path : "new", component : AddNewBusinessComponent}
]

@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessComponent,
    AddNewBusinessComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterOutlet,
    RouterModule.forChild(routes)
  ]
})
export class BusinessComponentsModule { }
