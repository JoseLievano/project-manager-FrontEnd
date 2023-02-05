import { Injectable } from '@angular/core';
import {Business} from "../Model/Business/Business";
import {Const} from "../Constant/const";

@Injectable({
  providedIn: 'root'
})
export class ModelClassURLService {

  constructor() { }

  public getClassURL<T> (model : T) : String{

    let secondURLPart : String = "";

    if (model instanceof Business){
      secondURLPart = Const.BUSINESS;
    }

    return secondURLPart;

  }
}
