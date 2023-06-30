import {Category} from "./category";
import {Business} from "../Business/Business";

export class CatContent<T>{

  public id : number | null;

  public title : string;

  public content : any;

  public business : Business | number;

  public category : Category<T> | number;

}
