import {Business} from "./Business";
import {bsKB} from "./bsKB";

export class bsKBCategory{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public business : Business | undefined | null;

  public KBs : bsKB[] | undefined | null;

  public bsKBCategory(
                      id : Number | undefined | null,
                      name : String | undefined | null,
                      business : Business | undefined | null,
                      KBs : bsKB[] | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.business = business;
    this.KBs = KBs;
  }

  static builder() : bsKBCategory{
    return new bsKBCategory();
  }

  public setId (id : Number) : bsKBCategory{
    this.id = id;
    return this;
  }

  public setName (name : String) : bsKBCategory{
    this.name = name;
    return this;
  }

  public setBusiness (business : Business) : bsKBCategory{
    this.business = business;
    return this;
  }

  public setKBs (KBs : bsKB[]) : bsKBCategory{
    this.KBs = KBs;
    return this;
  }

  public build() : bsKBCategory{
    return this;
  }


}
