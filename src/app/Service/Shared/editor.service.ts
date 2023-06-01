import { Injectable } from '@angular/core';
import EditorJS, {OutputData} from "@editorjs/editorjs";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private editorJS : EditorJS;

  constructor() {
  }

  public setEditor(editor : EditorJS){
    this.editorJS = editor;
  }

  public saveContent() : Promise<OutputData> {
    return this.editorJS.save()
  }

}
