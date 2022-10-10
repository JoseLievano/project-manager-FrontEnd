import {SidebarSubMenuElement} from "./SidebarSubMenuElement";

export class SidebarMenuElement{

  public name : String;
  public path : String;
  public isSeparator : Boolean;
  public hasSubmenu : Boolean;
  public submenu : SidebarSubMenuElement[];

  constructor (name : String, path : String, isSeparator : Boolean, hasSubmenu : Boolean, submenu : SidebarSubMenuElement[]){
    this.name = name;
    this.path = path;
    this.isSeparator = isSeparator;
    this.hasSubmenu = hasSubmenu;
    this.submenu = submenu;
  }
}
