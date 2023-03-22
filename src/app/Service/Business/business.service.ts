import { Injectable } from '@angular/core';
import {Const} from "../../Constant/const";
import {HttpClient} from "@angular/common/http";
import {ModelService} from "../Shared/model.service";
import {Business} from "../../Model/Business/Business";
import {LoginService} from "../Shared/login.service";
import {User} from "../../Model/Shared/User";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";

@Injectable({
  providedIn: 'root'
})
export class BusinessService extends ModelService<Business>{

  private url : String;

  protected override actualUser : User | null;

  constructor(protected override http : HttpClient,
              private loginService : LoginService) {
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
      {actionName: "Load", roles: ["ROLE_CLIENT"]},
      {actionName: "Delete", roles: ["ROLE_CLIENT"]}
    ]
    return actions;
  }


  //Methods to load and unload a business in the local storage
  public loadBusiness(businessID : number){
    window.localStorage.setItem("business", JSON.stringify(businessID));
  }

  public unloadBusiness(){
    window.localStorage.setItem("business", "-1");
  }

  public getLoadedBusiness() : number{
    return JSON.parse(<string> window.localStorage.getItem("business"));
  }

}
