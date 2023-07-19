import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsClient} from "../../Model/Business/bsClient";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {tableActionButton} from "../../Constant/table-action-button";
import {userRole} from "../../Constant/userRole";
import {ViewKey, ViewKeyBuilder} from "../../Model/Shared/ViewKey";

@Injectable({
  providedIn: 'root'
})
export class BsClientService extends ModelService<bsClient>{

  constructor(protected override http: HttpClient,
              protected override loginService : LoginService,
              protected override router : Router) {
    super(http, loginService, Const.API_URL + Const.bs_CLIENT, router)
  }

  createInstance(data: any): bsClient {
    return new bsClient(

    );
  }

  public override getButtonPermissions(): ActionsButtons[] {
    return [
      {actionName: tableActionButton.VIEW, roles: [userRole.CLIENT, userRole.ADMIN]},
      {actionName: tableActionButton.EDIT, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.ADD, roles: [userRole.CLIENT, userRole.BS_MANAGER]},
      {actionName: tableActionButton.UPDATE, roles: [userRole.CLIENT, userRole.ADMIN, userRole.BS_MANAGER]},
      {actionName: tableActionButton.DELETE, roles: [userRole.CLIENT, userRole.ADMIN]},
    ];
  }


  protected override getViewKeys(): ViewKey[] {
    let commonRoles : string[] = [userRole.ADMIN, userRole.CLIENT, userRole.EMPLOYEE];

    return [
      ViewKeyBuilder.builder().setPrivateKeyName("id").setPublicKeyName("ID").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("firstName").setPublicKeyName("First Name").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("lastName").setPublicKeyName("Last Name").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("username").setPublicKeyName("Username").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("email").setPublicKeyName("Email").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("phone").setPublicKeyName("Phone").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("projects").setPublicKeyName("Projects").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("invoices").setPublicKeyName("Invoices").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("country").setPublicKeyName("Country").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("dateCreated").setPublicKeyName("Date Created").setAccessRole(commonRoles)
    ]

  }
}
