import {NgModule} from "@angular/core";
import {BsClientIndexComponent} from "./bsClient/bs-client-index/bs-client-index.component";
import {NgClass} from "@angular/common";
import {AppRoutingModule} from "../../app-routing.module";
import {SharedComponentsModule} from "../Shared/shared-components.module";


@NgModule({
  declarations: [BsClientIndexComponent],
  imports: [
    NgClass,
    AppRoutingModule,
    SharedComponentsModule
  ],
  exports: []
})

export class BusinessRoutingModule{}
