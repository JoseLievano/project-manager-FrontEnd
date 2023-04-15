import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from "../../../Shared/shared-components.module";
import { BsDocListComponent } from './bs-doc-list/bs-doc-list.component';
@NgModule({
  declarations: [
    BsDocListComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class BsDocComponentsModule { }
