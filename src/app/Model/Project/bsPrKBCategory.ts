import {bsProject} from "./bsProject";
import {bsPrKB} from "./bsPrKB";

export class bsPrKBCategory{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public project : bsProject | undefined | null;

  public kbs : bsPrKB | undefined | null;

  public bsPrKBCategory(
                        id : Number | undefined | null,
                        name : String | undefined | null,
                        project : bsProject | undefined | null,
                        kbs : bsPrKB | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.project = project;
    this.kbs = kbs;
  }

  public builder() : bsPrKBCategory{
    return new bsPrKBCategory();
  }

  public setId(id : Number){
    this.id = id;
    return this;
  }

  public setName(name : String) : bsPrKBCategory{
    this.name = name;
    return this;
  }

  public setProject(project : bsProject) : bsPrKBCategory{
    this.project = project;
    return this;
  }

  public build() : bsPrKBCategory{
    return this;
  }

}
