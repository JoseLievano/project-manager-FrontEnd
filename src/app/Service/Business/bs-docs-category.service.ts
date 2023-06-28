import { Injectable } from '@angular/core';
import {ModelService} from "../Shared/model.service";
import {bsDocsCategory} from "../../Model/Business/bsDocsCategory";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../Shared/login.service";
import {Router} from "@angular/router";
import {Const} from "../../Constant/const";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {tableActionButton} from "../../Constant/table-action-button";
import {userRole} from "../../Constant/userRole";
import {ViewKey, ViewKeyBuilder} from "../../Model/Shared/ViewKey";
import {Paths} from "../../Constant/paths";

@Injectable({
  providedIn: 'root'
})
export class BsDocsCategoryService extends ModelService<bsDocsCategory>{

  private url : string;

  constructor(
    protected override http : HttpClient,
    protected override loginService : LoginService,
    protected override router : Router
  ) {
    super(http, loginService, Const.API_URL + Const.bs_DOCS_CATEGORY, router);
    this.url = Const.API_URL + Const.bs_DOCS_CATEGORY;
  }

  public override createInstance(data: any): bsDocsCategory {

    const newCategory = new bsDocsCategory();
    newCategory.id = data.id;
    newCategory.name = data.name;
    newCategory.description = data.description;
    newCategory.isAParentCategory = data.isAParentCategory;
    newCategory.level = data.level;
    newCategory.parentCategory = data.parentCategory;
    newCategory.business = data.business;
    newCategory.subCategories = data.subCategories;
    newCategory.bsDocs = data.bsDocs;

    return newCategory;

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


  protected override rolesAbleToAddNew(): string[] {
    return [userRole.ADMIN, userRole.BS_MANAGER, userRole.CLIENT];
  }


  protected override getViewKeys(): ViewKey[] {
    let commonRoles : string[] = [userRole.ADMIN, userRole.CLIENT, userRole.BS_MANAGER, userRole.BS_EMPLOYEE, userRole.BS_CLIENT];

    return [
      ViewKeyBuilder.builder().setPrivateKeyName("id").setPublicKeyName("ID").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("name").setPublicKeyName("Name").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("description").setPublicKeyName("Description").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("business").setPublicKeyName("Business").setAccessRole(commonRoles),
      ViewKeyBuilder.builder().setPrivateKeyName("bsDocs").setPublicKeyName("Docs").setAccessRole(commonRoles)
    ]

  }

  public override goToAddNewPage() {
    const url : string = Paths.BS_DOCS_CATEGORY.path + "/new";
    this.router.navigateByUrl(url);
  }

}
