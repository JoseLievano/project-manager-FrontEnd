import {Business} from "./Business";
import {bsDoc} from "./bsDoc";

export class bsDocsCategory{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public business : Business | undefined | null;

  public bsDocs : bsDoc[] | undefined | null;

  public bsDocsCategory(
                        id : Number | undefined | null,
                        name : String | undefined | null,
                        business : Business | undefined | null,
                        bsDocs : bsDoc[] | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.business = business;
    this.bsDocs = bsDocs;
  }

  static builder() : bsDocsCategory{
    return new bsDocsCategory();
  }

  public setId (id : Number) : bsDocsCategory{
    this.id = id;
    return this;
  }

  public setName (name : String) : bsDocsCategory{
    this.name = name;
    return this;
  }

  public setBusiness (business : Business) : bsDocsCategory{
    this.business = business;
    return this;
  }

  public setBsDocs (bsDocs : bsDoc[]) : bsDocsCategory{
    this.bsDocs = bsDocs;
    return this;
  }

  public build() : bsDocsCategory{
    return this;
  }

}
