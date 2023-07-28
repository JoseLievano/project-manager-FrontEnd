import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameFieldComponent } from './name-field/name-field.component';
import { FirstNameFieldComponent } from './first-name-field/first-name-field.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NameFieldComponent,
    FirstNameFieldComponent
  ],
  exports: [
    NameFieldComponent,
    FirstNameFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormFieldsModule { }
