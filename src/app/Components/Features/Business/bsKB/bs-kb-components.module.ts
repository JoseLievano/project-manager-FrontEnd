import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsKbComponent } from './bs-kb/bs-kb.component';
import { BsKbListComponent } from './bs-kb-list/bs-kb-list.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import { AddNewBsKbComponent } from './add-new-bs-kb/add-new-bs-kb.component';
import {ContentModule} from "../../../Shared/content/content.module";
import { EditBsKbComponent } from './edit-bs-kb/edit-bs-kb.component';
import { ViewKbComponent } from './view-kb/view-kb.component';

const routes: Routes = [
  {path : "", component : BsKbListComponent},
  {path : "new", component : AddNewBsKbComponent},
  {path : "edit/" + ":id", component : EditBsKbComponent},
  {path : "view/" + ":id", component : ViewKbComponent}
]

@NgModule({
  declarations: [
    BsKbComponent,
    BsKbListComponent,
    AddNewBsKbComponent,
    EditBsKbComponent,
    ViewKbComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedComponentsModule,
    ContentModule,
    RouterModule.forChild(routes)
  ]
})
export class BsKbComponentsModule { }
