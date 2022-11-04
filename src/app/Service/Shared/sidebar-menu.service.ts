import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {SidebarMenuElement} from "../../Model/Shared/SidebarMenuElement";
import {SidebarSubMenuElement} from "../../Model/Shared/SidebarSubMenuElement";
import {User} from "../../Model/Shared/User";

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  private sidebarIsVisible : Boolean = true;

  public actualUser : User;

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

  constructor(private loginService : LoginService) {
    /*this.actualUser = this.loginService.getActualUser();*/
  }

  toggleSidebar(){
    this.sidebarIsVisible = !this.sidebarIsVisible;
  }

  getSidebarIsVisible(){
    return this.sidebarIsVisible;
  }

  getSidebarMenuElements() {
    /*console.log(this.menuObjects.ROLE_BS_CLIENT);*/
    /*return this.menuObjects.ROLE_BS_CLIENT;*/

    // @ts-ignore
    let role = this.loginService.getActualUser().roles[0];

    // @ts-ignore
    if (role == "ROLE_BS_CLIENT"){
      // @ts-ignore
      return this.businessMenu;
    }else if (role == "ROLE_CLIENT"){
      // @ts-ignore
      return this.mainMenu;
    }

    return [{}];

  }

}
