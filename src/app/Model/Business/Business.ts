import {Client} from "../HQ/Client";
import {Invoice} from "../HQ/Invoice";
import {Plan} from "../HQ/Plan";
import {bsClient} from "./bsClient";
import {bsGeneralSettings} from "./bsGeneralSettings";
import {bsDoc} from "./bsDoc";
import {bsDocsCategory} from "./bsDocsCategory";
import {bsEmployee} from "./bsEmployee";
import {bsInvoice} from "./bsInvoice";

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

  public bsClients : bsClient[] | undefined | null;

  public bsGeneralSettings : bsGeneralSettings | undefined | null;

  public bsDocs : bsDoc[] | undefined | null;

  public bsDocsCategories : bsDocsCategory[] | undefined | null;

  public bsEmployees : bsEmployee[] | undefined | null;

  public bsInvoices : bsInvoice[] | undefined | null;

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
                    plan : Plan | undefined | null,
                    bsClients : bsClient[] | undefined | null,
                    bsGeneralSettings : bsGeneralSettings | undefined | null,
                    bsDocs : bsDoc[] | undefined | null,
                    bsDocsCategories : bsDocsCategory[] | undefined | null,
                    bsEmployees : bsEmployee[] | undefined | null,
                    bsInvoices : bsInvoice[] | undefined | null
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
    this.bsClients = bsClients;
    this.bsGeneralSettings = bsGeneralSettings;
    this.bsDocs = bsDocs;
    this.bsDocsCategories = bsDocsCategories;
    this.bsEmployees = bsEmployees;
    this.bsInvoices = bsInvoices;
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

  public setBsClients(bsClients: bsClient[]) : Business{
    this.bsClients = bsClients;
    return this;
  }

  public setBsGeneralSettings(bsGeneralSettings: bsGeneralSettings) : Business{
    this.bsGeneralSettings = bsGeneralSettings;
    return this;
  }

  public setBsDocs(bsDocs: bsDoc[]) : Business{
    this.bsDocs = bsDocs;
    return this;
  }

  public setBsDocsCategories(bsDocsCategories: bsDocsCategory[]) : Business{
    this.bsDocsCategories = bsDocsCategories;
    return this;
  }

  public setBsEmployees(bsEmployees: bsEmployee[]) : Business{
    this.bsEmployees = bsEmployees;
    return this;
  }

  public setBsInvoices(bsInvoices: bsInvoice[]) : Business{
    this.bsInvoices = bsInvoices;
    return this;
  }

  public build() : Business{
    return this;
  }

}
