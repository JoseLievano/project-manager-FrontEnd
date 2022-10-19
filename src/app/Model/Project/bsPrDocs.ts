import {bsProject} from "./bsProject";
import {bsPrDocsCategory} from "./bsPrDocsCategory";

export class bsPrDocs{

  public id : Number | undefined | null;

  public title : String | undefined | null;

  public content : String | undefined | null;

  public project : bsProject | undefined | null;

  public category : bsPrDocsCategory | undefined | null;

  public bsPrDocs(
                  id : Number | undefined | null,
                  title : String | undefined | null,
                  content : String | undefined | null,
                  project : bsProject | undefined | null,
                  category : bsPrDocsCategory | undefined | null
  ){
    this.id = id;
    this.title = title;
    this.content = content;
    this.project = project;
    this.category = category;
  }

  public builder () : bsPrDocs{
    return new bsPrDocs();
  }

  public setId (id : Number) : bsPrDocs{
    this.id = id;
    return this;
  }

  public setTitle (title : String) : bsPrDocs{
    this.title = title;
    return this;
  }

  public setContent (content : String) : bsPrDocs{
    this.content = content;
    return this;
  }

  public setProject (project : bsProject) : bsPrDocs{
    this.project = project;
    return this;
  }

  public setCategory (category : bsPrDocsCategory) : bsPrDocs{
    this.category = category;
    return this;
  }

  public build() : bsPrDocs{
    return this;
  }

}
