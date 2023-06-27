import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsKbComponent } from './bs-kb/bs-kb.component';
import { BsKbListComponent } from './bs-kb-list/bs-kb-list.component';
import {RouterOutlet} from "@angular/router";
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import { AddNewBsKbComponent } from './add-new-bs-kb/add-new-bs-kb.component';
import {ContentModule} from "../../../Shared/content/content.module";
import { EditBsKbComponent } from './edit-bs-kb/edit-bs-kb.component';
import { ViewKbComponent } from './view-kb/view-kb.component';



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
    ContentModule
  ]
})
export class BsKbComponentsModule { }
