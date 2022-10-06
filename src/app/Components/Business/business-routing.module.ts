import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BsClientIndexComponent} from "./bsClient/bs-client-index/bs-client-index.component";

const routes : Routes = [
    {path: "bs_client", component: BsClientIndexComponent}
  ]

@NgModule({
  declarations: [BsClientIndexComponent],
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})

export class BusinessRoutingModule{}
