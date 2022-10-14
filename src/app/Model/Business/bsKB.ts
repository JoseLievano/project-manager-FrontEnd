import {Business} from "./Business";
import {bsKBCategory} from "./bsKBCategory";

export class bsKB{

  public id : Number | undefined | null;

  public title : String | undefined | null;

  public content : String | undefined | null;

  public business : Business | undefined | null;

  public bsKBCategory : bsKBCategory | undefined | null;

  public bsKB(
              id : Number | undefined | null,
              title : String | undefined | null,
              content : String | undefined | null,
              business : Business | undefined | null,
              bsKBCategory : bsKBCategory | undefined | null
  ){
    this.id = id;
    this.title = title;
    this.content = content;
    this.business = business;
    this.bsKBCategory = bsKBCategory;
  }

  static builder() : bsKB{
    return new bsKB();
  }

  public setId (id : Number) : bsKB{
    this.id = id;
    return this;
  }

  public setTitle (title : String) : bsKB{
    this.title = title;
    return this;
  }

  public setContent (content : String) : bsKB{
    this.content = content;
    return this;
  }

  public setBusiness (business : Business) : bsKB{
    this.business = business;
    return this;
  }

  public setBsKBCategory (bsKBCategory : bsKBCategory) : bsKB{
    this.bsKBCategory = bsKBCategory;
    return this;
  }

  public build() : bsKB{
    return this;
  }

}
