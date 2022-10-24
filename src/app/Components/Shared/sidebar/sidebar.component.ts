import { Component, OnInit } from '@angular/core';
import {SidebarMenuService} from "../../../Service/Shared/sidebar-menu.service";
import {SidebarMenuElement} from "../../../Model/Shared/SidebarMenuElement";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private actualSubMenu : String = "";

  private activeMenu : String = "";

  public sideBarElements : [SidebarMenuElement];

  constructor(private sidebarOptions : SidebarMenuService, private router : Router) {

    // @ts-ignore
    this.sideBarElements = this.sidebarOptions.getSidebarMenuElements();

    console.log(this.sideBarElements);

  }

  ngOnInit(): void {


  }

  setActive(menu : String, path : String){
    this.activeMenu = menu;
    console.log(path);
    this.submenuToggle(menu);
    this.router.navigate([path]);
  }

  getActiveMenu(){
    return this.activeMenu;
  }

  submenuToggle( subName : String ){

    if( this.actualSubMenu == subName ){
      this.actualSubMenu = "";
    }else {
      this.actualSubMenu = subName;
    }
  };

  getActualSubMenu(){
    return this.actualSubMenu;
  }

  getSidebarToogleStatus(){
    return this.sidebarOptions.getSidebarIsVisible();
  }

  getSidebarElements(){
    return this.sideBarElements;
  }

}
