import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModelService} from "../Shared/model.service";
import {bsKB} from "../../Model/Business/bsKB";
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
export class BsKbService extends ModelService<bsKB>{

  private url : string;

  constructor(
    protected override http : HttpClient,
    protected override loginService : LoginService,
    protected override router : Router
  ) {
    super(http, loginService, Const.API_URL + Const.bs_KB, router)
    this.url = Const.API_URL + Const.bs_KB;
  }

  public override createInstance(data: any) : bsKB {
    return new bsKB(
      data.id,
      data.title,
      data.content,
      data.category,
      data.business
    )
  }

  public override getButtonPermissions(): ActionsButtons[] {
    return [
      {actionName: tableActionButton.VIEW, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.EDIT, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.DELETE, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.ADD, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.UPDATE, roles: [userRole.CLIENT]}
    ];
  }

  public override hiddenKeys(): HiddenKey[] {
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
      ViewKeyBuilder.builder().setPrivateKeyName("category").setPublicKeyName("Category").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("content").setPublicKeyName("Content").setAccessRole([userRole.BS_MANAGER]),
      ViewKeyBuilder.builder().setPrivateKeyName("business").setPublicKeyName("Business").setAccessRole(commonRoles)
    ]
  }

  override executeAction(action: string, id: number) {
    switch (action) {
      case tableActionButton.DELETE: {
        console.log("Deleting " + id);
        this.deleteOne(id).subscribe();
        break;
      }
    }
  }

}
