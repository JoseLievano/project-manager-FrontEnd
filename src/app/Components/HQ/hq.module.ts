import { NgModule } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {ClientIndexComponent} from "./Client/client-index/client-index.component";
import {AppRoutingModule} from "../../app-routing.module";
import {SharedComponentsModule} from "../Shared/shared-components.module";



@NgModule({
  declarations: [ClientIndexComponent],
  imports: [
    CommonModule,
    NgClass,
    AppRoutingModule,
    SharedComponentsModule
  ]
})
export class HQModule { }
