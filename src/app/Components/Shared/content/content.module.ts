import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ContentAddNewComponent } from './content-add-new/content-add-new.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ViewContentComponent } from './view-content/view-content.component';
import { RenderParagraphComponent } from './render-blocks/render-paragraph/render-paragraph.component';
import { RenderHeaderComponent } from './render-blocks/render-header/render-header.component';
import { ContentEditComponent } from './content-edit/content-edit.component';



@NgModule({
  declarations: [
    EditorComponent,
    ContentAddNewComponent,
    ViewContentComponent,
    RenderParagraphComponent,
    RenderHeaderComponent,
    ContentEditComponent
  ],
    exports: [
        EditorComponent,
        ContentAddNewComponent,
        ViewContentComponent,
        ContentEditComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
