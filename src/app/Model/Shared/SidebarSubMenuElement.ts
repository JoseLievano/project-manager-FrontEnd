export class SidebarSubMenuElement{
  public name : String ;
  public path : String ;

  constructor(name? : String , path? : String){
    this.name = name ?? "";
    this.path = path ??  "";
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

  public build() : SidebarSubMenuElement{
    return this;
  }
}
