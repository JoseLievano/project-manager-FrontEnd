import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessListViewComponent } from './Business/business-list-view/business-list-view.component';



@NgModule({
  declarations: [
    BusinessListViewComponent
  ],
  exports: [
    BusinessListViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModelCBusinessModule { }
