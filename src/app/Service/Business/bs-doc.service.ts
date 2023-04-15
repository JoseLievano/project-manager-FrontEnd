import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsDoc} from "../../Model/Business/bsDoc";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {tableActionButton} from "../../Constant/table-action-button";
import {userRole} from "../../Constant/userRole";
import {HiddenKey} from "../../Model/Shared/hiddenKey";

@Injectable({
  providedIn: 'root'
})
export class BsDocService extends ModelService<bsDoc>{

  private url : String;
  constructor(protected override http : HttpClient,
              protected override loginService : LoginService,
              private router : Router) {
    super(http, loginService, Const.API_URL + Const.bs_DOC);
    this.url = Const.API_URL + Const.bs_DOC;
  }

  override getButtonPermissions(): ActionsButtons[] {
    return [
      {actionName: tableActionButton.VIEW, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.DELETE, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.EDIT, roles: [userRole.CLIENT]}
    ];
  }

  override hiddenKeys(): HiddenKey[] {
    return [
      new HiddenKey("content" )
    ]
  }
}
