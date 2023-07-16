import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import { BsDocListComponent } from './bs-doc-list/bs-doc-list.component';
import { AddNewBsDocComponent } from './add-new-bs-doc/add-new-bs-doc.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { BsDocComponent } from './bs-doc/bs-doc.component';
import {ContentModule} from "../../../Shared/content/content.module";
import { ViewDocComponent } from './view-doc/view-doc.component';
import { EditBsDocComponent } from './edit-bs-doc/edit-bs-doc.component';

const routes: Routes = [
  {path : "", component : BsDocListComponent},
  {path : "new", component : AddNewBsDocComponent},
  {path : "view/" + ":id", component : ViewDocComponent},
  {path : "edit/" + ":id", component : EditBsDocComponent}
]

@NgModule({
  declarations: [
    BsDocListComponent,
    AddNewBsDocComponent,
    BsDocComponent,
    ViewDocComponent,
    EditBsDocComponent
  ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouterOutlet,
        ContentModule,
        RouterModule.forChild(routes)
    ]
})
export class BsDocComponentsModule { }
