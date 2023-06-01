import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsEmployee} from "../../Model/Business/bsEmployee";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";

@Injectable({
  providedIn: 'root'
})
export class BsEmployeeService extends ModelService<bsEmployee>{

  constructor(protected override http : HttpClient,
              protected override loginService : LoginService,
              protected override router : Router) {
    super (http, loginService, Const.API_URL + Const.bs_EMPLOYEE, router);
  }

  createInstance(data: any): bsEmployee {
    return new bsEmployee();
  }

}
