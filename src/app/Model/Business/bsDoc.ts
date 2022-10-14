import {Business} from "./Business";
import {bsDocsCategory} from "./bsDocsCategory";

export class bsDoc{

  public id : Number | undefined | null;

  public title : String | undefined | null;

  public content : String | undefined | null;

  public business : Business | undefined | null;

  public bsDocCategory : bsDocsCategory | undefined | null;

  public bsDoc(
                id : Number | undefined | null,
                title : String | undefined | null,
                content : String | undefined | null,
                business : Business | undefined | null,
                bsDocCategory : bsDocsCategory | undefined | null
  ){
    this.id = id;
    this.title = title;
    this.content = content;
    this.business = business;
    this.bsDocCategory = bsDocCategory;
  }

  static builder() : bsDoc{
    return new bsDoc();
  }

  public setId (id : Number) : bsDoc{
    this.id = id;
    return this;
  }

  public setTitle (title : String) : bsDoc{
    this.title = title;
    return this;
  }

  public setContent (content : String) : bsDoc{
    this.content = content;
    return this;
  }

  public setBusiness (business : Business) : bsDoc{
    this.business = business;
    return this;
  }

  public setBsDocCategory (bsDocCategory : bsDocsCategory) : bsDoc{
    this.bsDocCategory = bsDocCategory;
    return this;
  }

  public build() : bsDoc{
    return this;
  }


}
