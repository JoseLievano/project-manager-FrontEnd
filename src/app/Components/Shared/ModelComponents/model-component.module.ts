import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModelCBusinessModule} from "./Business/model-c-business.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModelCBusinessModule
  ],
  exports: [
    ModelCBusinessModule
  ]
})
export class ModelComponentModule { }
