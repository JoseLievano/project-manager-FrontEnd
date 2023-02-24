import { Injectable } from '@angular/core';
import {Business} from "../Model/Business/Business";
import {Const} from "../Constant/const";
import {bsClient} from "../Model/Business/bsClient";
import {bsDoc} from "../Model/Business/bsDoc";
import {bsDocsCategory} from "../Model/Business/bsDocsCategory";
import {bsEmployee} from "../Model/Business/bsEmployee";
import {bsKBCategory} from "../Model/Business/bsKBCategory";
import {bsManager} from "../Model/Business/bsManager";

@Injectable({
  providedIn: 'root'
})
export class ModelClassURLService {

  constructor() { }

  public getClassURL<T> (model : T) : String{

    let modelClassName : String = "";

    // @ts-ignore
    let modelConstructor = model.constructor as new() => T;

    try {
      modelClassName = modelConstructor.name;
    }catch (e){
      throw new Error("Model dosen't have a constructor")
    }

    console.log("modelClass: " + modelClassName);

    let secondURLPart : String | undefined = undefined;

    switch (modelClassName){
      case "bsCliente" : {
        secondURLPart = Const.bs_CLIENT;
        break;
      }
      case "bsDoc" : {
        secondURLPart = Const.bs_DOC;
        break;
      }
      case "bsDocsCategory" : {
        secondURLPart = Const.bs_DOCS_CATEGORY;
        break;
      }
      case "bsEmployee" : {
        secondURLPart = Const.bs_EMPLOYEE;
        break;
      }
      case "bsInvoice" : {
        secondURLPart = Const.bs_INVOICE;
        break;
      }
      case "bsKB" : {
        secondURLPart = Const.bs_KB;
        break;
      }
      case "bsKBCategory" : {
        secondURLPart = Const.bs_KB_CATEGORY;
        break;
      }
      case "bsManager" : {
        secondURLPart = Const.bs_MANAGER;
        break;
      }
      case "bsPriority" : {
        secondURLPart = Const.bs_PRIORITY;
        break;
      }
      case "bsStatus" : {
        secondURLPart = Const.bs_STATUS;
        break;
      }
      case "bsTaskCategory" : {
        secondURLPart = Const.bs_TASK_CATEGORY;
        break;
      }
      case "bsType" : {
        secondURLPart = Const.bs_TYPE;
        break;
      }
      case "Business" : {
        secondURLPart = Const.BUSINESS;
        break;
      }

    }

    if (!secondURLPart){
      throw new Error("Model class not found");
    }

    return secondURLPart;

  }
}
