import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  sidebarIsVisible : Boolean = true;

  constructor() { }

  toggleSidebar(){
    this.sidebarIsVisible = !this.sidebarIsVisible;
    console.log("sidebarIsVisible: " + this.sidebarIsVisible);
  }

}
