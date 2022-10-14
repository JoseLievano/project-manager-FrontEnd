import {Business} from "./Business";

export class bsType{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public business : Business | undefined | null;

  public bsType(
                id : Number | undefined | null,
                name : String | undefined | null,
                business : Business | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.business = business;
  }

  static builder() : bsType{
    return new bsType();
  }

  public setId(id: Number) : bsType{
    this.id = id;
    return this;
  }

  public setName (name : String) : bsType{
    this.name = name;
    return this;
  }

  public setBusiness(business: Business) : bsType{
    this.business = business;
    return this;
  }

  public build() : bsType{
    return this;
  }

}
