import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {User} from "../../Model/User";
import {SidebarMenuElement} from "../../Model/SidebarMenuElement";
import {SidebarSubMenuElement} from "../../Model/SidebarSubMenuElement";

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  private sidebarIsVisible : Boolean = true;

  private actualSideBarUser : User;

  private menuObjects  = {
    ROLE_BS_CLIENT : [
      new SidebarMenuElement("Dashboard", "/dashboard", false, false, []),
      new SidebarMenuElement("Orders", "/orders", false, false, []),
      new SidebarMenuElement("Products", "/products", false, false, []),
      new SidebarMenuElement("SubMenuTest", "/bs_client/submenu", false, true, [
        new SidebarSubMenuElement("Submenu1", "/bs_client/submenu/submenu1"),
        new SidebarSubMenuElement("Submenu2", "/bs_client/submenu/submenu2"),
      ]),

    ],
    ROLE_BS_ADMIN : []
  }

  constructor(private loginService : LoginService) {
    this.actualSideBarUser = this.loginService.getActualUser();
  }

  toggleSidebar(){
    this.sidebarIsVisible = !this.sidebarIsVisible;
  }

  getSidebarIsVisible(){
    return this.sidebarIsVisible;
  }

  getSidebarMenuElements() {
    /*console.log(this.menuObjects.ROLE_BS_CLIENT);*/
    return this.menuObjects.ROLE_BS_CLIENT;

    /*// @ts-ignore
    if (this.actualSideBarUser.roles[0] == "ROLE_BS_CLIENT"){
      // @ts-ignore
      return this.menuObjects["ROLE_BS_CLIENT"];
    }

    return [{}];*/

  }

}
