import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsClientListComponent } from './bs-client-list/bs-client-list.component';
import { AddNewBsClientComponent } from './add-new-bs-client/add-new-bs-client.component';
import { BsClientComponent } from './bs-client/bs-client.component';
import { EditBsClientComponent } from './edit-bs-client/edit-bs-client.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path : "", component : BsClientListComponent},
  {path : "new", component : AddNewBsClientComponent},
  {path : "edit/:id", component : EditBsClientComponent},
]

@NgModule({
  declarations: [
    BsClientListComponent,
    AddNewBsClientComponent,
    BsClientComponent,
    EditBsClientComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class BsClientComponentsModule { }
