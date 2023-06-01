import { Injectable } from '@angular/core';
import {CatContent} from "../../Model/Shared/cat-content";

@Injectable({
  providedIn: 'root'
})
export class CatContentService<T> {

  constructor() { }

  public createNewContent(catID : number, title : string, content : any) : CatContent<T> {

    let newContent = new CatContent();
    newContent.title = title;
    newContent.content = content;
    newContent.category = catID;

    return newContent;

  }

}
