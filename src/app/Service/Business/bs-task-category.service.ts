import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsTaskCategory} from "../../Model/Business/bsTaskCategory";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BsTaskCategoryService extends ModelService<bsTaskCategory>{

  private url : string;

  constructor(
    protected override http : HttpClient,
    protected override loginService : LoginService,
    protected override router : Router
  ) {
    super(http, loginService, Const.API_URL + Const.bs_TASK_CATEGORY, router);
    this.url = Const.API_URL + Const.bs_TASK_CATEGORY;
  }

  public taskCategoriesAreEmpty() : Observable<boolean>{
    const url : string = this.url + "is-empty";
    return this.http.get<boolean>(url);
  }

  createInstance(data : any): bsTaskCategory {
    return new bsTaskCategory(
      data.id,
      data.name,
      data.business,
      data.tasks
    );
  }
}
