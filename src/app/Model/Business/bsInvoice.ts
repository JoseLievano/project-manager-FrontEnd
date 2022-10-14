import {bsClient} from "./bsClient";
import {Business} from "./Business";

export class bsInvoice{

  public id : Number | undefined | null;

  public dateGenerated : Date | undefined | null;

  public limitDate : Date | undefined | null;

  public amount : Number | undefined | null;

  public isPaid : Boolean | undefined | null;

  public isOverDue : Boolean | undefined | null;

  public number : String | undefined | null;

  public client : bsClient | undefined | null;

  public business : Business | undefined | null;

  public bsInvoice(
                    id : Number | undefined | null,
                    dateGenerated : Date | undefined | null,
                    limitDate : Date | undefined | null,
                    amount : Number | undefined | null,
                    isPaid : Boolean | undefined | null,
                    isOverDue : Boolean | undefined | null,
                    number : String | undefined | null,
                    client : bsClient | undefined | null,
                    business : Business | undefined | null
  ){
    this.id = id;
    this.dateGenerated = dateGenerated;
    this.limitDate = limitDate;
    this.amount = amount;
    this.isPaid = isPaid;
    this.isOverDue = isOverDue;
    this.number = number;
    this.client = client;
    this.business = business;
  }

  static builder() : bsInvoice{
    return new bsInvoice();
  }

  public setId (id : Number) : bsInvoice{
    this.id = id;
    return this;
  }

  public setDateGenerated (dateGenerated : Date) : bsInvoice{
    this.dateGenerated = dateGenerated;
    return this;
  }

  public setLimitDate (limitDate : Date) : bsInvoice{
    this.limitDate = limitDate;
    return this;
  }

  public setAmount (amount : Number) : bsInvoice{
    this.amount = amount;
    return this;
  }

  public setIsPaid (isPaid : Boolean) : bsInvoice{
    this.isPaid = isPaid;
    return this;
  }

  public setIsOverDue (isOverDue : Boolean) : bsInvoice{
    this.isOverDue = isOverDue;
    return this;
  }

  public setNumber (number : String) : bsInvoice{
    this.number = number;
    return this;
  }

  public setClient (client : bsClient) : bsInvoice{
    this.client = client;
    return this;
  }

  public setBusiness (business : Business) : bsInvoice{
    this.business = business;
    return this;
  }

  public build() : bsInvoice{
    return this;
  }


}
