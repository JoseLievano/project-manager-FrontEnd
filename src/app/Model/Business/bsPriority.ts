import {Business} from "./Business";

export class bsPriority{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public priorityOrder : Number | undefined | null;

  public business : Business | undefined | null;

  public bsPriority (
                      id : Number | undefined | null,
                      name : String | undefined | null,
                      priorityOrder : Number | undefined | null,
                      business : Business | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.priorityOrder = priorityOrder;
    this.business = business;
  }

  static builder() : bsPriority{
    return new bsPriority();
  }

  public setId(id: Number) : bsPriority{
    this.id = id;
    return this;
  }

  public setName(name: String) : bsPriority{
    this.name = name;
    return this;
  }

  public setPriorityOrder(priorityOrder: Number) : bsPriority{
    this.priorityOrder = priorityOrder;
    return this;
  }

  public setBusiness(business: Business) : bsPriority{
    this.business = business;
    return this;
  }

  public build() : bsPriority{
    return this;
  }

}
