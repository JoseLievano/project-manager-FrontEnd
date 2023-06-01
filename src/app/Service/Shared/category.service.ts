import { Injectable } from '@angular/core';
import {Category} from "../../Model/Shared/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  public loadParentCategory(categoryId : number | null) : void {
    if (categoryId)
      window.localStorage.setItem("parentCat", JSON.stringify(categoryId));
  }

  public getParentCategory() : number {
    let actualParentCategory : number = JSON.parse(<string>window.localStorage.getItem("parentCat"));
    if (actualParentCategory > 0){
      return actualParentCategory;
    }
    return -1;
  }

}
