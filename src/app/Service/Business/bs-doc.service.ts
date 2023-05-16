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
import {ViewKey, ViewKeyBuilder} from "../../Model/Shared/ViewKey";

@Injectable({
  providedIn: 'root'
})
export class BsDocService extends ModelService<bsDoc>{

  private url : String;
  constructor(protected override http : HttpClient,
              protected override loginService : LoginService,
              protected override router : Router) {
    super(http, loginService, Const.API_URL + Const.bs_DOC, router);
    this.url = Const.API_URL + Const.bs_DOC;
  }

  override getButtonPermissions(): ActionsButtons[] {
    return [
      {actionName: tableActionButton.VIEW, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.EDIT, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.DELETE, roles: [userRole.CLIENT]}
    ];
  }

  override hiddenKeys(): HiddenKey[] {
    return [
      new HiddenKey("content"),
    ]
  }


  protected override rolesAbleToAddNew(): string[] {
    return [userRole.CLIENT, userRole.ADMIN, userRole.BS_MANAGER]
  }


  protected override getViewKeys(): ViewKey[] {

    let commonRoles : string[] = [userRole.ADMIN, userRole.CLIENT, userRole.BS_MANAGER, userRole.BS_EMPLOYEE, userRole.BS_CLIENT];

    return [
      ViewKeyBuilder.builder().setPrivateKeyName("id").setPublicKeyName("ID").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("title").setPublicKeyName("Title").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsDocsCategory").setPublicKeyName("Category").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("content").setPublicKeyName("Content").setAccessRole([userRole.BS_MANAGER]),
      ViewKeyBuilder.builder().setPrivateKeyName("business").setPublicKeyName("Business").setAccessRole(commonRoles)
    ]

  }
}
