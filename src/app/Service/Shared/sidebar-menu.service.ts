import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {SidebarMenuElement} from "../../Model/Shared/SidebarMenuElement";
import {SidebarSubMenuElement} from "../../Model/Shared/SidebarSubMenuElement";
import {User} from "../../Model/Shared/User";
import {userRole} from "../../Constant/userRole";
import {BusinessService} from "../Business/business.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  private sidebarIsVisible : Boolean = true;

  public actualUser : User | null;

  private mainMenu : SidebarMenuElement[] = [
    SidebarMenuElement.builder()
      .setName("Dashboard")
      .setPath("dashboard")
      .setIsSeparator(false)
      .setHasSubmenu(false)
      .setCanActiveRoles(["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_EMPLOYEE"]),
    SidebarMenuElement.builder()
      .setName("Business")
      .setPath("business")
      .setIsSeparator(false)
      .setHasSubmenu(false)
      .setCanActiveRoles(["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_EMPLOYEE"]),
  ]

  private mainMenu2 : SidebarMenuElement[] = [
    SidebarMenuElement.builder()
      .setName("Dashboard")
      .setPath("dashboard")
      .setNeedBusinessLoaded(false)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_CLIENT, userRole.BS_EMPLOYEE, userRole.BS_MANAGER]),
    SidebarMenuElement.builder()
      .setName("Business")
      .setPath("business")
      .setNeedBusinessLoaded(false)
      .setShowWithBusinessLoaded(false)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.EMPLOYEE]),
    SidebarMenuElement.builder()
      .setName("No Business")
      .setPath("#")
      .setNeedBusinessLoaded(false)
      .setShowWithBusinessLoaded(false)
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT]),
    SidebarMenuElement.builder()
      .setName("Projects")
      .setPath("#")
      .setCanActiveRoles([userRole.ADMIN, userRole.CLIENT, userRole.BS_MANAGER, userRole.BS_EMPLOYEE])
  ]

  private businessMenu : SidebarMenuElement[] = [
    SidebarMenuElement.builder()
      .setName("Dashboard")
      .setPath("dashboard")
      .setIsSeparator(false)
      .setHasSubmenu(false)
      .setCanActiveRoles(["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_EMPLOYEE", "ROLE_BS_CLIENT", "ROLE_BS_EMPLOYEE", "ROLE_BS_MANAGER"]),
  ];

  // @ts-ignore
  // @ts-ignore
  private menuObjects  = {
    ROLE_CLIENT : [
      SidebarMenuElement.builder().setName("Dashboard").setPath("/dashboard").setIsSeparator(false).setHasSubmenu(false).setSubmenu([]).build(),
      SidebarMenuElement.builder().setName("Business").setPath("/business").setIsSeparator(false).setHasSubmenu(false).setSubmenu([]).build()
    ]
  }

  constructor(private loginService : LoginService, private businessService : BusinessService) {
    this.actualUser = loginService.getActualUser();
  }

  toggleSidebar(){
    this.sidebarIsVisible = !this.sidebarIsVisible;
  }

  getSidebarIsVisible(){
    return this.sidebarIsVisible;
  }

  getSidebarMenuElements() : SidebarMenuElement[] {

    let actualSidebar : SidebarMenuElement [] = [];

    let actualRole : String = "";

    if (this.actualUser?.roles){
      actualRole = this.actualUser.roles[0];
    }else {
      return actualSidebar;
    }

    let businessLoaded : Boolean = false;
    if (this.businessService.getLoadedBusiness() >= 0){
      businessLoaded = true;
    }

    for (let item of this.mainMenu2){

      let userRoleIndex = item.canActiveRoles.indexOf(actualRole);

      if (userRoleIndex >= 0 && businessLoaded == item.showWithBusinessLoaded){

        if ((item.needBusinessLoaded && businessLoaded) || !item.needBusinessLoaded){
          actualSidebar.push(item);
        }
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
