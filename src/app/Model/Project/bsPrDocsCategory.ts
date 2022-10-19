import {bsProject} from "./bsProject";
import {bsPrDocs} from "./bsPrDocs";

export class bsPrDocsCategory{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public project : bsProject | undefined | null;

  public docs : bsPrDocs[] | undefined | null;

  public bsPrDocsCategory(
                          id : Number | undefined | null,
                          name : String | undefined | null,
                          project : bsProject | undefined | null,
                          docs : bsPrDocs[] | undefined | null,
  ){
    this.id = id;
    this.name = name;
    this.project = project;
    this.docs = docs;
  }

  public builder() : bsPrDocsCategory{
    return new bsPrDocsCategory();
  }

  public setId(id : Number) : bsPrDocsCategory{
    this.id = id;
    return this;
  }

  public setName(name : String) : bsPrDocsCategory{
    this.name = name;
    return this;
  }

  public setProject(project : bsProject) : bsPrDocsCategory{
    this.project = project;
    return this;
  }

  public setDocs (docs : bsPrDocs[]) : bsPrDocsCategory{
    this.docs = docs;
    return this;
  }

  public build() : bsPrDocsCategory{
    return this;
  }

}
