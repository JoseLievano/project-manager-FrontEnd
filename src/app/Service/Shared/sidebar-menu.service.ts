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

  // @ts-ignore
  // @ts-ignore
  private menuObjects  = {
    ROLE_BS_CLIENT : [
      new SidebarMenuElement("Dashboard", "/dashboard", false, false, []),
      new SidebarMenuElement("Orders", "/orders", false, false, []),
      new SidebarMenuElement("Products", "/products", false, false, []),
      SidebarMenuElement.builder().setName("Settings").setPath("/settings").setIsSeparator(false).setHasSubmenu(false).setSubmenu([]).build(),
      SidebarMenuElement.builder().setName("subeMenuTest").setPath("/subeMenuTest").setIsSeparator(true).setHasSubmenu(true).setSubmenu([
          SidebarSubMenuElement.builder().setName("Submenu1").setPath("/bs_client/submenu/submenu1").build(),
          SidebarSubMenuElement.builder().setName("Submenu2").setPath("/bs_client/submenu/submenu2").build(),
          SidebarSubMenuElement.builder().setName("submenu3"),
          SidebarSubMenuElement.builder().setName("submenu4").build(),
        ]).build(),
      new SidebarMenuElement("SubMenuTest", "/bs_client/submenu", false, true, [
        SidebarSubMenuElement.builder().setName("Submenu1").setPath("/bs_client/submenu/submenu1").build(),
        SidebarSubMenuElement.builder().setName("Submenu2").setPath("/bs_client/submenu/submenu2").build(),
        SidebarSubMenuElement.builder().setName("submenu3"),
        SidebarSubMenuElement.builder().setName("submenu4").build(),
      ]),

    ],
    ROLE_BS_ADMIN : []
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

    console.log("actual user: " + this.loginService.getActualUser().username)

    // @ts-ignore
    if (this.loginService.getActualUser().roles[0] == "ROLE_BS_CLIENT"){
      // @ts-ignore
      return this.menuObjects["ROLE_BS_CLIENT"];
    }

    return [{}];

  }

}
