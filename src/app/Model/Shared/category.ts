import {CatContent} from "./cat-content";
import {ICategory} from "./i-category";
import {Business} from "../Business/Business";

export class Category<T> implements ICategory<T>{

  public id : number | null;

  public name : string;

  public description : string;

  public coverImage : string;

  public isAParentCategory: boolean;

  public level : number;

  public parentCategory : Category<T> | number | null;

  public business : Business | number;

  public subCategories : Category<T>;

  public content : CatContent<T>[];

  public constructor( ) {

  }

  public setContent() : void {

  }

  public getContent(): CatContent<T>[] {
    return [];
  }

}
