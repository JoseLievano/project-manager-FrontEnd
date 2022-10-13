import {MainHQ} from "./MainHQ";
import {Invoice} from "./Invoice";

export class Plan{

  public id : Number | undefined | null ;

  public price : Number | undefined | null ;

  public userLimit : Number | undefined | null ;

  public diskLimit : Number | undefined | null ;

  public maxProjects : Number | undefined | null ;

  public mainHQ : MainHQ | undefined | null ;

  public invoices : Invoice[] | undefined | null ;

  public Plan(
              id : Number | undefined | null ,
              price : Number | undefined | null ,
              userLimit : Number | undefined | null ,
              diskLimit : Number | undefined | null ,
              maxProjects : Number | undefined | null ,
              mainHQ : MainHQ | undefined | null,
              invoices : Invoice[] | undefined | null
  ){
    this.id = id;
    this.price = price;
    this.userLimit = userLimit;
    this.diskLimit = diskLimit;
    this.maxProjects = maxProjects;
    this.mainHQ = mainHQ;
    this.invoices = invoices;
  }

  static builder() : Plan{
    return new Plan();
  }

  public setId (id : Number) : Plan{
    this.id = id;
    return this;
  }

  public setPrice (price : Number) : Plan{
    this.price = price;
    return this;
  }

  public setUserLimit (userLimit : Number) : Plan{
    this.userLimit = userLimit;
    return this;
  }

  public setDiskLimit (diskLimit : Number) : Plan{
    this.diskLimit = diskLimit;
    return this;
  }

  public setMaxProjects (maxProjects : Number) : Plan{
    this.maxProjects = maxProjects;
    return this;
  }

  public setMainHQ (mainHQ : MainHQ) : Plan{
    this.mainHQ = mainHQ;
    return this;
  }

  public setInvoices (invoices : Invoice[]) : Plan{
    this.invoices = invoices;
    return this;
  }

  public build() : Plan{
    return this;
  }

}
