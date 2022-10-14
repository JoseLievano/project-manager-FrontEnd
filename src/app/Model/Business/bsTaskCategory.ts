import {Business} from "./Business";

export class bsTaskCategory{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public business : Business | undefined | null;

  public bsTaskCategory(
                        id : Number | undefined | null,
                        name : String | undefined | null,
                        business : Business | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.business = business;
  }

  static builder() : bsTaskCategory{
    return new bsTaskCategory();
  }

  public setID(id : Number) : bsTaskCategory{
    this.id = id;
    return this;
  }

  public setName(name : String) : bsTaskCategory{
    this.name = name;
    return this;
  }

  public setBusiness(business : Business) : bsTaskCategory{
    this.business = business;
    return this;
  }

  public build() : bsTaskCategory{
    return this;
  }

}
