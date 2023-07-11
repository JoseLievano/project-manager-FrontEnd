import { Injectable } from '@angular/core';
import EditorJS, {OutputData} from "@editorjs/editorjs";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private editors : {id : number, editor : EditorJS}[] = [];

  constructor() {
  }

  public addToEditorList(id : number, editor : EditorJS) : void{

    console.log("Adding new editor");

    let actualEditor : {id: number, editor : EditorJS} = {
      id: id,
      editor : editor
    }

    this.editors.push(actualEditor);

  }

  public saveContent(id : number) : Promise<OutputData>{

    let editorToSave  = this.editors.find((editor) => editor.id === id);

    if (editorToSave?.editor){
      return editorToSave.editor.save();
    }

    return Promise.reject("Editor error");

  }

  public editorExist(id : number) : boolean{
    return this.editors.findIndex((editor) => editor.id == id) > -1;
  }

  public destroyEditor (id : number) {
    let editorIndex = this.editors.findIndex((obj) => obj.id === id);
    this.editors.splice(editorIndex, 1);
  }

}
