import {CatContent} from "./cat-content";

export interface ICategory<T> {

  id : number | null;

  name : string;

  description : string;

  coverImage : string;

  content : CatContent<T>[];

  level : number;

  setContent():void;

  getContent() : CatContent<T>[];

}
