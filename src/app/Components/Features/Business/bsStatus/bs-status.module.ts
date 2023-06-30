import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BsStatusComponent} from "./bs-status/bs-status.component";
import {RouterOutlet} from "@angular/router";
import { BsStatusListComponent } from './bs-status-list/bs-status-list.component';
import { ViewBsStatusComponent } from './view-bs-status/view-bs-status.component';
import {NgxColorsModule} from "ngx-colors";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddNewBsStatusComponent } from './add-new-bs-status/add-new-bs-status.component';
import { EditBsStatusComponent } from './edit-bs-status/edit-bs-status.component';



@NgModule({
  declarations: [
    BsStatusComponent,
    BsStatusListComponent,
    ViewBsStatusComponent,
    AddNewBsStatusComponent,
    EditBsStatusComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BsStatusModule { }
