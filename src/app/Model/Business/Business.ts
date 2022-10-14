import {Client} from "../HQ/Client";
import {Invoice} from "../HQ/Invoice";
import {Plan} from "../HQ/Plan";

export class Business{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public taxID : String | undefined | null;

  public dateCreated : Date | undefined | null;

  public pendingInvoice : Boolean | undefined | null;

  public overDue : Boolean | undefined | null;

  public isActive : Boolean | undefined | null;

  public client : Client | undefined | null;

  public invoices : Invoice[] | undefined | null;

  public plan : Plan | undefined | null;

  public Business (
                    id : Number | undefined | null,
                    name : String | undefined | null,
                    taxID : String | undefined | null,
                    dateCreated : Date | undefined | null,
                    pendingInvoice : Boolean | undefined | null,
                    overDue : Boolean | undefined | null,
                    isActive : Boolean | undefined | null,
                    client : Client | undefined | null,
                    invoices : Invoice[] | undefined | null,
                    plan : Plan | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.taxID = taxID;
    this.dateCreated = dateCreated;
    this.pendingInvoice = pendingInvoice;
    this.overDue = overDue;
    this.isActive = isActive;
    this.client = client;
    this.invoices = invoices;
    this.plan = plan;
  }

  static builder () : Business{
    return new Business();
  }

  public setId(id: Number) : Business{
    this.id = id;
    return this;
  }

  public setName(name: String) : Business{
    this.name = name;
    return this;
  }

  public setTaxID(taxID: String) : Business{
    this.taxID = taxID;
    return this;
  }

  public setDateCreated(dateCreated: Date) : Business{
    this.dateCreated = dateCreated;
    return this;
  }

  public setPendingInvoice(pendingInvoice: Boolean) : Business{
    this.pendingInvoice = pendingInvoice;
    return this;
  }

  public setOverDue(overDue: Boolean) : Business{
    this.overDue = overDue;
    return this;
  }

  public setIsActive(isActive: Boolean) : Business{
    this.isActive = isActive;
    return this;
  }

  public setClient(client: Client) : Business{
    this.client = client;
    return this;
  }

  public setInvoices(invoices: Invoice[]) : Business{
    this.invoices = invoices;
    return this;
  }

  public setPlan(plan: Plan) : Business{
    this.plan = plan;
    return this;
  }

  public build() : Business{
    return this;
  }

}
