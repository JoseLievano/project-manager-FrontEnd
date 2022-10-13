import {MainHQ} from "./MainHQ";
import {Plan} from "./Plan";

export class Invoice{

  public id : Number | undefined | null ;

  public amount : Number | undefined | null ;

  public dateGenerated : Date | undefined | null ;

  public limitDate : Date | undefined | null ;

  public isPaid : Boolean | undefined | null ;

  public overDue : Boolean | undefined | null ;

  public number : String | undefined | null ;

  public mainHQ : MainHQ | undefined | null ;

  public plan : Plan | undefined | null ;

  public Invoice(
                  id : Number | undefined | null ,
                  amount : Number | undefined | null ,
                  dateGenerated : Date | undefined | null ,
                  limitDate : Date | undefined | null ,
                  isPaid : Boolean | undefined | null ,
                  overDue : Boolean | undefined | null ,
                  number : String | undefined | null ,
                  mainHQ : MainHQ | undefined | null ,
                  plan : Plan | undefined | null
  ){
    this.id = id;
    this.amount = amount;
    this.dateGenerated = dateGenerated;
    this.limitDate = limitDate;
    this.isPaid = isPaid;
    this.overDue = overDue;
    this.number = number;
    this.mainHQ = mainHQ;
    this.plan = plan;
  }

  static builder() : Invoice{
    return new Invoice();
  }

  public setId (id : Number) : Invoice{
    this.id = id;
    return this;
  }

  public setAmount (amount : Number) : Invoice{
    this.amount = amount;
    return this;
  }

  public setDateGenerated (dateGenerated : Date) : Invoice{
    this.dateGenerated = dateGenerated;
    return this;
  }

  public setLimitDate (limitDate : Date) : Invoice{
    this.limitDate = limitDate;
    return this;
  }

  public setIsPaid (isPaid : Boolean) : Invoice{
    this.isPaid = isPaid;
    return this;
  }

  public setOverDue (overDue : Boolean) : Invoice{
    this.overDue = overDue;
    return this;
  }

  public setNumber (number : String) : Invoice{
    this.number = number;
    return this;
  }

  public setMainHQ (mainHQ : MainHQ) : Invoice{
    this.mainHQ = mainHQ;
    return this;
  }

  public setPlan (plan : Plan) : Invoice{
    this.plan = plan;
    return this;
  }

  public build() : Invoice{
    return this;
  }

}
