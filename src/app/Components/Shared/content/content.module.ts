import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ContentAddNewComponent } from './content-add-new/content-add-new.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EditorComponent,
    ContentAddNewComponent
  ],
  exports: [
    EditorComponent,
    ContentAddNewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
