import {Injectable} from '@angular/core';
import {Const} from "../../Constant/const";
import {HttpClient} from "@angular/common/http";
import {ModelService} from "../Shared/model.service";
import {Business} from "../../Model/Business/Business";
import {LoginService} from "../Shared/login.service";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {tableActionButton} from "../../Constant/table-action-button";
import {Router} from "@angular/router";
import {userRole} from "../../Constant/userRole";
import {ErrorHandlerService} from "../Shared/error-handler.service";
import {errorMessages} from "../../Constant/errorMessages";

@Injectable({
  providedIn: 'root'
})
export class BusinessService extends ModelService<Business> {

  private url: String;

  constructor(protected override http: HttpClient,
              protected override loginService: LoginService,
              private router: Router,
              private errorService : ErrorHandlerService) {
    super(http,loginService, Const.API_URL + Const.BUSINESS);
    this.url = Const.API_URL + Const.BUSINESS;
  }

  protected override pageListViewRestrictions(pageRequest: PageRequest) {

    if (this.actualUser != null || this.actualUser != undefined) {
      // @ts-ignore
      if (this.actualUser.roles[0] != userRole.CLIENT) {
        let newError : Error = new Error();
        newError.message = errorMessages.FORBIDDEN;
        newError.name = "Internal Error";
        this.errorService.processError(newError);
      }
    }

    if (pageRequest.sort?.length == 0) {
      pageRequest.sort = [
        {"property": "id", "isAscending": true}
      ];
    }
  }

  override getButtonPermissions(): ActionsButtons[] {
    return [
      {actionName: tableActionButton.LOAD, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.EDIT, roles: [userRole.CLIENT]},
      {actionName: tableActionButton.DELETE, roles: [userRole.CLIENT]}
    ];
  }

  override executeAction(action: string, id: number): void {
    switch (action) {
      case tableActionButton.LOAD:
        this.loadBusiness(id);
        break;
    }
  }

  //Methods to load and unload a business in the local storage
  public loadBusiness(businessID: number) {
    window.localStorage.setItem("business", JSON.stringify(businessID));
    this.router.navigate(["dashboard"])
  }

  public unloadBusiness() {
    window.localStorage.setItem("business", "-1");
    this.router.navigate(["dashboard"]);
  }

  public getLoadedBusiness(): number {
    let actualBusiness: number = JSON.parse(<string>window.localStorage.getItem("business"));

    if (actualBusiness >= 0) {
      return actualBusiness;
    }
    return -1;
  }

}
