import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsClientListComponent } from './bs-client-list/bs-client-list.component';
import { AddNewBsClientComponent } from './add-new-bs-client/add-new-bs-client.component';
import { BsClientComponent } from './bs-client/bs-client.component';
import { EditBsClientComponent } from './edit-bs-client/edit-bs-client.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";

const routes: Routes = [
  {path : "", component : BsClientListComponent}
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
        RouterModule.forChild(routes)
    ]
})
export class BsClientComponentsModule { }
