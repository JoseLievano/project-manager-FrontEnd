import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import { BsDocListComponent } from './bs-doc-list/bs-doc-list.component';
import { AddNewBsDocComponent } from './add-new-bs-doc/add-new-bs-doc.component';
import {RouterOutlet} from "@angular/router";
import { BsDocComponent } from './bs-doc/bs-doc.component';
import {ContentModule} from "../../../Shared/content/content.module";
@NgModule({
  declarations: [
    BsDocListComponent,
    AddNewBsDocComponent,
    BsDocComponent
  ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouterOutlet,
        ContentModule
    ]
})
export class BsDocComponentsModule { }
