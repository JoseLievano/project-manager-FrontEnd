import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsType} from "../../Model/Business/bsType";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {tableActionButton} from "../../Constant/table-action-button";
import {userRole} from "../../Constant/userRole";

@Injectable({
  providedIn: 'root'
})
export class BsTypeService extends ModelService<bsType>{

  private url : string;

  constructor(
    protected override http : HttpClient,
    protected override loginService : LoginService,
    protected override router : Router
  ) {
    super(http, loginService, Const.API_URL + Const.bs_TYPE, router);
    this.url = Const.API_URL + Const.bs_TYPE;
  }

  createInstance(data: any): bsType {
    return new bsType(
      data.id,
      data.name,
      data.business,
      data.taskCategories,
      data.tasks
    );
  }


  protected override rolesAbleToAddNew(): string[] {
    return [userRole.CLIENT, userRole.ADMIN];
  }

  public override getButtonPermissions(): ActionsButtons[] {
    return [
      {actionName: tableActionButton.LOAD, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.EDIT, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.DELETE, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.ADD, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.UPDATE, roles: [userRole.CLIENT]}
    ];
  }
}
