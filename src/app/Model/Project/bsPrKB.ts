import {bsProject} from "./bsProject";
import {bsPrKBCategory} from "./bsPrKBCategory";

export class bsPrKB{

  public id : Number | undefined | null;

  public title : String | undefined | null;

  public content : String | undefined | null;

  public project : bsProject | undefined | null;

  public category : bsPrKBCategory | undefined | null;

  public bsPrKB(
                id: Number | undefined | null,
                title : String | undefined | null,
                content : String | undefined | null,
                project : bsProject | undefined | null,
                category : bsPrKBCategory | undefined | null
  ){
    this.id = id;
    this.title = title;
    this.content = content;
    this.project = project;
    this.category = category;
  }

  public builder() : bsPrKB{
    return new bsPrKB();
  }

  public setId(id : Number) : bsPrKB{
    this.id = id;
    return this;
  }

  public setTitle(title : String) : bsPrKB{
    this.title = title;
    return this;
  }

  public setContent(content : String) : bsPrKB{
    this.content = content;
    return this;
  }

  public setProject(project : bsProject) : bsPrKB{
    this.project = project;
    return this;
  }

  public setCategory(category : bsPrKBCategory) : bsPrKB{
    this.category = category;
    return this;
  }

  public build() : bsPrKB{
    return this;
  }

}
