import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsStatus} from "../../Model/Business/bsStatus";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {userRole} from "../../Constant/userRole";
import {tableActionButton} from "../../Constant/table-action-button";

@Injectable({
  providedIn: 'root'
})
export class BsStatusService extends ModelService<bsStatus>{

  private url : string;

  constructor(
    protected override http : HttpClient,
    protected override loginService : LoginService,
    protected override router : Router
  ) {
    super (http, loginService, Const.API_URL + Const.bs_STATUS, router)
    this.url = Const.API_URL + Const.bs_STATUS;
  }

  createInstance(data: any): bsStatus {
    return new bsStatus(

    );
  }

  override getButtonPermissions(): ActionsButtons[] {

    let commonRoles : string [] = [userRole.CLIENT, userRole.ADMIN, userRole.BS_CLIENT, userRole.BS_MANAGER, userRole.BS_EMPLOYEE];
    let manageRoles : string [] = [userRole.CLIENT, userRole.ADMIN, userRole.BS_MANAGER];

    return [
      {actionName: tableActionButton.VIEW, roles: commonRoles},
      {actionName: tableActionButton.EDIT, roles: manageRoles},
      {actionName: tableActionButton.DELETE, roles : manageRoles},
      {actionName: tableActionButton.UPDATE, roles: manageRoles},
      {actionName: tableActionButton.ADD, roles: manageRoles}
    ]
  }

}
