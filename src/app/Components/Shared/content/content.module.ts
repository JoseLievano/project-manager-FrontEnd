import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ContentAddNewComponent } from './content-add-new/content-add-new.component';



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
    CommonModule
  ]
})
export class ContentModule { }
