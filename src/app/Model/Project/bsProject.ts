import {Business} from "../Business/Business";
import {bsClient} from "../Business/bsClient";
import {bsInvoice} from "../Business/bsInvoice";
import {bsPrChannel} from "./bsPrChannel";

export class bsProject{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public isCompleted : Boolean | undefined | null;

  public created : Date | undefined | null;

  public dueDate : Date | undefined | null;

  public business : Business | undefined | null;

  public client : bsClient | undefined | null;

  public invoices : bsInvoice[] | undefined | null;

  public channels : bsPrChannel[] | undefined | null;

  public bsProject(
                    id: Number | undefined | null,
                    name: String | undefined | null,
                    isCompleted : Boolean | undefined | null,
                    created : Date | undefined | null,
                    dueDate : Date | undefined | null,
                    business : Business | undefined | null,
                    client : bsClient | undefined | null,
                    invoices : bsInvoice[] | undefined | null,
                    channels : bsPrChannel[] | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.isCompleted = isCompleted;
    this.created = created;
    this.dueDate = dueDate;
    this.business = business;
    this.client = client;
    this.invoices = invoices;
    this.channels = channels;
  }

  static builder() : bsProject{
    return new bsProject();
  }

  public setId(id : Number) : bsProject{
    this.id = id;
    return this;
  }

  public setName(name : String) : bsProject{
    this.name = name;
    return this;
  }

  public setIsCompleted(isCompleted : Boolean) : bsProject {
    this.isCompleted = isCompleted;
    return this;
  }

  public setCreated(created : Date) : bsProject {
    this.created = created;
    return this;
  }

  public setDueDate(dueDate : Date) : bsProject {
    this.dueDate = dueDate;
    return this;
  }

  public setBusiness(business : Business) : bsProject {
    this.business = business;
    return this;
  }

  public setClient(client : bsClient) : bsProject {
    this.client = client;
    return this;
  }

  public setInvoices(invoices : bsInvoice[]) : bsProject{
    this.invoices = invoices;
    return this;
  }

  public setChannels(channels : bsPrChannel[]) : bsProject{
    this.channels = channels;
    return this;
  }

  public build() : bsProject{
    return this;
  }

}
