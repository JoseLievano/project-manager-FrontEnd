import { Injectable } from '@angular/core';
import {Const} from "../../Constant/const";
import {HttpClient} from "@angular/common/http";
import {ModelService} from "../Shared/model.service";
import {Business} from "../../Model/Business/Business";
import {LoginService} from "../Shared/login.service";
import {User} from "../../Model/Shared/User";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {tableActionButton} from "../../Constant/table-action-button";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BusinessService extends ModelService<Business>{

  private url : String;

  protected override actualUser : User | null;

  constructor(protected override http : HttpClient,
              private loginService : LoginService,
              private router : Router) {
    super(http, loginService.getActualUser());
    this.url = Const.API_URL + Const.BUSINESS;
  }

  protected override pageListViewRestrictions(pageRequest: PageRequest) {

    if (this.actualUser != null || this.actualUser != undefined) {
      // @ts-ignore
      if (this.actualUser.roles[0] != "ROLE_CLIENT") {
        throw {message : "You don't have permission to view this"};
      }
    }

    if (pageRequest.sort?.length == 0){
      pageRequest.sort = [
        {"property" : "id", "isAscending": true}
      ];
    }
  }

  override getButtonPermissions(): ActionsButtons[] {
    let actions : ActionsButtons[] = [
      {actionName: tableActionButton.LOAD, roles: ["ROLE_CLIENT"]},
      {actionName: tableActionButton.EDIT, roles: ["ROLE_CLIENT"]}
    ]
    return actions;
  }

  override executeAction(action : string, id : number) : void {
    switch (action){
      case tableActionButton.LOAD:
        this.loadBusiness(id);
        break;
    }
  }

  //Methods to load and unload a business in the local storage
  public loadBusiness(businessID : number){
    window.localStorage.setItem("business", JSON.stringify(businessID));
    this.router.navigate(["dashboard"])
  }

  public unloadBusiness(){
    window.localStorage.setItem("business", "-1");
    this.router.navigate(["dashboard"]);
  }

  public getLoadedBusiness() : number{
    let actualBusiness : number = JSON.parse(<string> window.localStorage.getItem("business"));

    if (actualBusiness >= 0){
      return actualBusiness;
    }
    return -1;
  }

}
