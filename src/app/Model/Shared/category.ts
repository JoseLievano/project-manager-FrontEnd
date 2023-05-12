import {CatContent} from "./cat-content";

export class Category{

  public id : number | null;

  public name : string;

  public description : string;

  public coverImage : string;

  public content : CatContent[];

  public level : number;

  public constructor() {
  }

  public setContent() : void {

  }

}
