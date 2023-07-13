import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsPriority} from "../../Model/Business/bsPriority";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {userRole} from "../../Constant/userRole";
import {tableActionButton} from "../../Constant/table-action-button";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BsPriorityService extends ModelService<bsPriority>{

  private url : string;
  constructor(
    protected override http : HttpClient,
    protected override loginService : LoginService,
    protected override router : Router
  ) {
    super(http, loginService, Const.API_URL + Const.bs_PRIORITY, router);
    this.url = Const.API_URL + Const.bs_PRIORITY;
  }

  public updateOrder(priorities : bsPriority[]) : Observable<bsPriority[]>{

    const url : string = this.url + "update-order";

    return this.http.put<bsPriority[]>(url, priorities);

  }

  createInstance(data: any): bsPriority {
    return new bsPriority(
      data.id,
      data.name,
      data.priorityOrder,
      data.business,
      data.tasks
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
