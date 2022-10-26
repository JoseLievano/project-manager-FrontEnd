import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BusinessFeaturesModule} from "./Business/business-features.module";
import {HqFeaturesModule} from "./HQ/hq-features.module";
import {ProjectFeaturesModule} from "./Project/project-features.module";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    BusinessFeaturesModule,
    HqFeaturesModule,
    ProjectFeaturesModule
  ],
  exports: [
    BusinessFeaturesModule,
    HqFeaturesModule,
    ProjectFeaturesModule
  ]
})
export class FeaturesModule { }
