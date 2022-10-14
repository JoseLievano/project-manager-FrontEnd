import {Client} from "../HQ/Client";
import {Invoice} from "../HQ/Invoice";
import {Plan} from "../HQ/Plan";
import {bsClient} from "./bsClient";
import {bsGeneralSettings} from "./bsGeneralSettings";
import {bsDoc} from "./bsDoc";
import {bsDocsCategory} from "./bsDocsCategory";
import {bsEmployee} from "./bsEmployee";
import {bsInvoice} from "./bsInvoice";
import {bsKBCategory} from "./bsKBCategory";
import {bsKB} from "./bsKB";
import {bsManager} from "./bsManager";
import {bsPriority} from "./bsPriority";
import {bsStatus} from "./bsStatus";
import {bsTaskCategory} from "./bsTaskCategory";

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

  public bsKBCategories : bsKBCategory[] | undefined | null;

  public bsKBs : bsKB[] | undefined | null;

  public bsManagers : bsManager[] | undefined | null;

  public bsPriorities : bsPriority[] | undefined | null;

  public bsStatuses : bsStatus[] | undefined | null;

  public bsTaskCategories : bsTaskCategory[] | undefined | null;

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
                    bsInvoices : bsInvoice[] | undefined | null,
                    bsKBCategories : bsKBCategory[] | undefined | null,
                    bsKBs : bsKB[] | undefined | null,
                    bsManagers : bsManager[] | undefined | null,
                    bsPriorities : bsPriority[] | undefined | null,
                    bsStatuses : bsStatus[] | undefined | null,
                    bsTaskCategories : bsTaskCategory[] | undefined | null
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
    this.bsKBCategories = bsKBCategories;
    this.bsKBs = bsKBs;
    this.bsManagers = bsManagers;
    this.bsPriorities = bsPriorities;
    this.bsStatuses = bsStatuses;
    this.bsTaskCategories = bsTaskCategories;
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

  public setBsKBCategories(bsKBCategories: bsKBCategory[]) : Business{
    this.bsKBCategories = bsKBCategories;
    return this;
  }

  public setBsKBs(bsKBs: bsKB[]) : Business{
    this.bsKBs = bsKBs;
    return this;
  }

  public setBsManagers(bsManagers: bsManager[]) : Business{
    this.bsManagers = bsManagers;
    return this;
  }

  public setBsPriorities(bsPriorities: bsPriority[]) : Business{
    this.bsPriorities = bsPriorities;
    return this;
  }

  public setBsStatuses(bsStatuses : bsStatus[]) : Business{
    this.bsStatuses = bsStatuses;
    return this;
  }

  public setBsTaskCategories(bsTaskCategories : bsTaskCategory[]) : Business{
    this.bsTaskCategories = bsTaskCategories;
    return this;
  }

  public build() : Business{
    return this;
  }

}
