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
import {ViewKey, ViewKeyBuilder} from "../../Model/Shared/ViewKey";

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

  protected override rolesAbleToAddNew(): string[] {

    return [userRole.CLIENT, userRole.ADMIN];

  }


  protected override getViewKeys(): ViewKey[] {

    let commonRoles : string[] = [userRole.ADMIN, userRole.CLIENT, userRole.EMPLOYEE];

    return [
      ViewKeyBuilder.builder().setPrivateKeyName("id").setPublicKeyName("ID").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("name").setPublicKeyName("Name").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("taxID").setPublicKeyName("Tax ID").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("dateCreated").setPublicKeyName("Date").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("pendingInvoice").setPublicKeyName("Pending Invoice").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("overDue").setPublicKeyName("Overdue").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("isActive").setPublicKeyName("Active").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("client").setPublicKeyName("Client").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("invoices").setPublicKeyName("Invoices").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("plan").setPublicKeyName("Plan").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsClients").setPublicKeyName("Clients").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsDocs").setPublicKeyName("Docs").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsDocsCategories").setPublicKeyName("Docs Categories").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsEmployees").setPublicKeyName("Employees").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsInvoices").setPublicKeyName("Customer Invoices").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsKBCategories").setPublicKeyName("KB Categories").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsKBs").setPublicKeyName("KBs").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsManagers").setPublicKeyName("Managers").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsPriorities").setPublicKeyName("Priorities").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsStatuses").setPublicKeyName("Statuses").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsTaskCategories").setPublicKeyName("Task Categories").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsTypes").setPublicKeyName("Types").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsProjects").setPublicKeyName("Projects").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsPrTasks").setPublicKeyName("Tasks").setAccessRole(commonRoles)
    ];

  }
}
