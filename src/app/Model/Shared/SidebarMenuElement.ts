import {SidebarSubMenuElement} from "./SidebarSubMenuElement";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faFolder} from "@fortawesome/free-solid-svg-icons";

export class SidebarMenuElement{

  public name : String ;
  public path : String ;
  public isSeparator : Boolean ;
  public hasSubmenu : Boolean ;
  public canActiveRoles : String[] = [];
  public submenu : SidebarSubMenuElement[];
  public needBusinessLoaded : Boolean;
  public showWithBusinessLoaded : Boolean;
  public icon : IconDefinition

  constructor (
    name? : String,
    path? : String,
    isSeparator? : Boolean,
    hasSubmenu? : Boolean,
    canActiveRoles? : String[],
    submenu? : SidebarSubMenuElement[],
    needBusinessLoaded? : Boolean,
    showWithBusinessLoaded? : Boolean,
    icon? : IconDefinition
  ){
    this.name = name ?? "";
    this.path = path ?? "";
    this.isSeparator = isSeparator ?? false;
    this.hasSubmenu = hasSubmenu ?? false;
    this.canActiveRoles = canActiveRoles ?? [];
    this.submenu = submenu ?? [];
    this.needBusinessLoaded = needBusinessLoaded ?? true;
    this.showWithBusinessLoaded = showWithBusinessLoaded ?? true;
    this.icon = icon ?? faFolder
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

  public setNeedBusinessLoaded(needBusiness : Boolean) : SidebarMenuElement{
    this.needBusinessLoaded = needBusiness;
    return this;
  }

  public setShowWithBusinessLoaded(show : Boolean) : SidebarMenuElement{
    this.showWithBusinessLoaded = show;
    return this;
  }

  public setIcon(icon : IconDefinition) : SidebarMenuElement{
    this.icon = icon;
    return this;
  }

  public build() : SidebarMenuElement{
    return this;
  }

}
