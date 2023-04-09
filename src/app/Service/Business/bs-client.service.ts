import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsClient} from "../../Model/Business/bsClient";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";

@Injectable({
  providedIn: 'root'
})
export class BsClientService extends ModelService<bsClient>{

  constructor(protected override http: HttpClient,
              protected override loginService : LoginService,
              private router : Router) {
    super(http, loginService, Const.API_URL + Const.bs_CLIENT)
  }

}
