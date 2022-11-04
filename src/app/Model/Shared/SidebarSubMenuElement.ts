export class SidebarSubMenuElement{
  public name : String ;
  public path : String ;
  public canActiveRoles : String[] = [];

  constructor(name? : String , path? : String, canActiveRoles? : String[]){
    this.name = name ?? "";
    this.path = path ??  "";
    this.canActiveRoles = canActiveRoles ?? [];
  }

  static builder() : SidebarSubMenuElement{
    return new SidebarSubMenuElement();
  }

  public setName (name : String) : SidebarSubMenuElement{
    this.name = name;
    return this;
  }

  public setPath (path : String) : SidebarSubMenuElement{
    this.path = path;
    return this;
  }

  public setCanActiveRoles (canActiveRoles : String[]) : SidebarSubMenuElement{
    this.canActiveRoles = canActiveRoles;
    return this;
  }

  public build() : SidebarSubMenuElement{
    return this;
  }
}
