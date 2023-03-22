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

  private mainMenu2 : SidebarMenuElement[] = [
    SidebarMenuElement.builder()
      .setName("Dashboard")
      .setPath("dashboard")
      .setCanActiveRoles(["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_EMPLOYEE"]),
    SidebarMenuElement.builder()
      .setName("Business")
      .setPath("business")
      .setNeedBusinessLoaded(false)
      .setShowWithBusinessLoaded(false)
      .setCanActiveRoles(["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_EMPLOYEE"]),
    SidebarMenuElement.builder()
      .setName("No Business")
      .setPath("#")
      .setNeedBusinessLoaded(false)
      .setShowWithBusinessLoaded(false)
      .setCanActiveRoles(["ROLE_CLIENT", "ROLE_ADMIN"]),
    SidebarMenuElement.builder()
      .setName("Projects")
      .setPath("#")
      .setNeedBusinessLoaded(true)
      .setCanActiveRoles(["ROLE_CLIENT", "ROLE_ADMIN"])
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

  }

  toggleSidebar(){
    this.sidebarIsVisible = !this.sidebarIsVisible;
  }

  getSidebarIsVisible(){
    return this.sidebarIsVisible;
  }

  getSidebarMenuElements() : SidebarMenuElement[] {

    let actualSidebar : SidebarMenuElement [] = [];

    return actualSidebar;

  }

}
