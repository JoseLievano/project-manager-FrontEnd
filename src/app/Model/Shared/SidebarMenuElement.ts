import {SidebarSubMenuElement} from "./SidebarSubMenuElement";

export class SidebarMenuElement{

  public name : String ;
  public path : String ;
  public isSeparator : Boolean ;
  public hasSubmenu : Boolean ;
  public canActiveRoles : String[] = [];
  public submenu : SidebarSubMenuElement[] ;

  constructor (name? : String,
               path? : String,
               isSeparator? : Boolean,
               hasSubmenu? : Boolean,
               canActiveRoles? : String[],
               submenu? : SidebarSubMenuElement[]){
    this.name = name ?? "";
    this.path = path ?? "";
    this.isSeparator = isSeparator ?? false;
    this.hasSubmenu = hasSubmenu ?? false;
    this.canActiveRoles = canActiveRoles ?? [];
    this.submenu = submenu ?? [];
  }

  static builder() : SidebarMenuElement{
    return new SidebarMenuElement();
  }

  public setName (name : String) : SidebarMenuElement{
    this.name = name;
    return this;
  }

  public setPath (path : String) : SidebarMenuElement{
    this.path = path;
    return this;
  }

  public setIsSeparator (isSeparator : Boolean) : SidebarMenuElement{
    this.isSeparator = isSeparator;
    return this;
  }

  public setHasSubmenu (hasSubmenu : Boolean) : SidebarMenuElement{
    this.hasSubmenu = hasSubmenu;
    return this;
  }

  public setCanActiveRoles (canActiveRoles : String[]) : SidebarMenuElement{
    this.canActiveRoles = canActiveRoles;
    return this;
  }

  public setSubmenu (submenu : SidebarSubMenuElement[]) : SidebarMenuElement{
    this.submenu = submenu;
    return this;
  }

  public build() : SidebarMenuElement{
    return this;
  }

}
