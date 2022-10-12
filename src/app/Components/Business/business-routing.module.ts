import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BsClientIndexComponent} from "./bsClient/bs-client-index/bs-client-index.component";
import {NgClass} from "@angular/common";
import {AppRoutingModule} from "../../app-routing.module";
import {SharedComponentsModule} from "../Shared/shared-components.module";

const routes : Routes = [
    {path: "bs_client", component: BsClientIndexComponent}
  ]

@NgModule({
  declarations: [BsClientIndexComponent],
  imports: [
    RouterModule.forRoot(routes),
    NgClass,
    AppRoutingModule,
    SharedComponentsModule
  ],
  exports: [RouterModule]
})

export class BusinessRoutingModule{}
