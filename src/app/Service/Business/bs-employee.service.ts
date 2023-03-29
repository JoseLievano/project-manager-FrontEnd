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
              private loginService : LoginService,
              private router : Router) {
    super(http, loginService.getActualUser(), Const.API_URL + Const.bs_EMPLOYEE)
  }

}
