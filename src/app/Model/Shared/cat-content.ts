import {Category} from "./category";

export class CatContent<T>{

  public id : number | null;

  public title : string;

  public content : any;

  public category : Category<T> | number;

}
