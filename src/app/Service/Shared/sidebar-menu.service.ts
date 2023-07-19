import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {SidebarMenuElement} from "../../Model/Shared/SidebarMenuElement";
import {User} from "../../Model/Shared/User";
import {userRole} from "../../Constant/userRole";
import {BusinessService} from "../Business/business.service";
import {Paths} from "../../Constant/paths";
import {FaIconsService} from "./fa-icons.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  private sidebarIsVisible : Boolean = true;

  public actualUser : User | null;

  private mainMenu : SidebarMenuElement[] = [
    SidebarMenuElement.builder()
      .setName(Paths.DASHBOARD.name)
      .setPath(Paths.DASHBOARD.path)
      .setIcon(this.iconService.faHome)
      .setNeedBusinessLoaded(false)
      .setShowWithBusinessLoaded(true)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER]),
    SidebarMenuElement.builder()
      .setName(Paths.BS_CLIENT.name)
      .setPath(Paths.BS_CLIENT.path)
      .setIcon(this.iconService.faUserTie)
      .setNeedBusinessLoaded(true)
      .setShowWithBusinessLoaded(true)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER]),
    SidebarMenuElement.builder()
      .setName(Paths.BUSINESS.name)
      .setPath(Paths.BUSINESS.path)
      .setIcon(this.iconService.faFileLines)
      .setNeedBusinessLoaded(false)
      .setShowWithBusinessLoaded(false)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.EMPLOYEE]),
    SidebarMenuElement.builder()
      .setName(Paths.BS_DOC.name)
      .setPath(Paths.BS_DOC.path)
      .setIcon(this.iconService.faFile)
      .setNeedBusinessLoaded(true)
      .setShowWithBusinessLoaded(true)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER]),
    SidebarMenuElement.builder()
      .setName(Paths.BS_KB.name)
      .setPath(Paths.BS_KB.path)
      .setIcon(this.iconService.faFileLines)
      .setNeedBusinessLoaded(true)
      .setShowWithBusinessLoaded(true)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER]),
    SidebarMenuElement.builder()
      .setName(Paths.BS_STATUS.name)
      .setPath(Paths.BS_STATUS.path)
      .setIcon(this.iconService.faCube)
      .setNeedBusinessLoaded(true)
      .setShowWithBusinessLoaded(true)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER]),
    SidebarMenuElement.builder()
      .setName(Paths.BS_TASK_CATEGORY.name)
      .setPath(Paths.BS_TASK_CATEGORY.path)
      .setIcon(this.iconService.faFolderTree)
      .setNeedBusinessLoaded(true)
      .setShowWithBusinessLoaded(true)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER]),
    SidebarMenuElement.builder()
      .setName(Paths.BS_TYPE.name)
      .setPath(Paths.BS_TYPE.path)
      .setIcon(this.iconService.faCircleNodes)
      .setNeedBusinessLoaded(true)
      .setShowWithBusinessLoaded(true)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER]),
    SidebarMenuElement.builder()
      .setName(Paths.BS_PRIORITY.name)
      .setPath(Paths.BS_PRIORITY.path)
      .setIcon(this.iconService.faPersonArrowUpFromLine)
      .setNeedBusinessLoaded(true)
      .setShowWithBusinessLoaded(true)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER])
  ]

  constructor(
    private loginService : LoginService,
    private businessService : BusinessService,
    private iconService : FaIconsService
  ) {
    this.actualUser = loginService.getActualUser();
  }

  toggleSidebar(){
    this.sidebarIsVisible = !this.sidebarIsVisible;
  }

  getSidebarIsVisible(){
    return this.sidebarIsVisible;
  }

  getSidebarMenuElements() : SidebarMenuElement[] {

    const actualSidebar: SidebarMenuElement[] = [];

    const actualRole = this.actualUser?.roles?.[0];

    if (!actualRole) {
      return actualSidebar;
    }

    const businessLoaded = this.businessService.getLoadedBusiness() >= 0;

    for (const item of this.mainMenu) {
      if (!item.canActiveRoles.includes(actualRole)) {
        continue;
      }

      if (item.needBusinessLoaded && !businessLoaded) {
        continue;
      }

      if (item.showWithBusinessLoaded || !businessLoaded) {
        actualSidebar.push(item);
      }
    }

    return actualSidebar;
  }

  businessIsLoaded() : Boolean{
    return this.businessService.getLoadedBusiness() >= 0;
  }

  unloadBusiness() : void {
    let roles : String[] = [
      userRole.ADMIN,
      userRole.CLIENT
    ]

    if (this.actualUser?.roles){
      if (roles.indexOf(this.actualUser.roles[0]) >= 0){
        this.businessService.unloadBusiness();
      }
    }
  }

}
