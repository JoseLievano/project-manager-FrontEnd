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
import {bsType} from "./bsType";
import {bsProject} from "../Project/bsProject";
import {bsPrTask} from "../Project/bsPrTask";
import {PageRequest} from "../Shared/pageRequest";
import {BusinessService} from "../../Service/Business/business.service";

export class Business{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public taxID : String | undefined | null;

  public dateCreated : Date | undefined | null;

  public pendingInvoice : Boolean | undefined | null;

  public overDue : Boolean | undefined | null;

  public isActive : Boolean | undefined | null;

  public client : Client | undefined | null;

  public plan : Plan | undefined | null;

  public bsGeneralSettings : bsGeneralSettings | undefined | null;

  public invoices : Invoice[] | number | undefined | null;

  public bsClients : bsClient[] | number | undefined | null;

  public bsDocs : bsDoc[] | number | undefined | null;

  public bsDocsCategories : bsDocsCategory[] | number | undefined | null;

  public bsEmployees : bsEmployee[] | number | undefined | null;

  public bsInvoices : bsInvoice[] | number | undefined | null;

  public bsKBCategories : bsKBCategory[] | number | undefined | null;

  public bsKBs : bsKB[] | number | undefined | null;

  public bsManagers : bsManager[] | number | undefined | null;

  public bsPriorities : bsPriority[] | number | undefined | null;

  public bsStatuses : bsStatus[] | number | undefined | null;

  public bsTaskCategories : bsTaskCategory[] | number | undefined | null;

  public bsTypes : bsType[] | number | undefined | null;

  public bsProjects : bsProject[] | number | undefined | null;

  public bsPrTasks : bsPrTask[] | number | undefined | null;

  private static pageRequest : PageRequest;

  public static service : BusinessService;

  public Business (
                    id : Number | undefined | null,
                    name : String | undefined | null,
                    taxID : String | undefined | null,
                    dateCreated : Date | undefined | null,
                    pendingInvoice : Boolean | undefined | null,
                    overDue : Boolean | undefined | null,
                    isActive : Boolean | undefined | null,
                    client : Client | undefined | null,
                    invoices : Invoice[] | number | undefined | null,
                    plan : Plan | undefined | null,
                    bsClients : bsClient[] | number | undefined | null,
                    bsGeneralSettings : bsGeneralSettings | undefined | null,
                    bsDocs : bsDoc[] | number | undefined | null,
                    bsDocsCategories : bsDocsCategory[] | number | undefined | null,
                    bsEmployees : bsEmployee[] | number | undefined | null,
                    bsInvoices : bsInvoice[] | number | undefined | null,
                    bsKBCategories : bsKBCategory[] | number | undefined | null,
                    bsKBs : bsKB[] | number | undefined | null,
                    bsManagers : bsManager[] | number | undefined | null,
                    bsPriorities : bsPriority[] | number | undefined | null,
                    bsStatuses : bsStatus[] | number | undefined | null,
                    bsTaskCategories : bsTaskCategory[] | number | undefined | null,
                    bsTypes : bsType[] | number | undefined | null,
                    bsProjects : bsProject[] | number | undefined | null,
                    bsPrTasks : bsPrTask[] | number | undefined | null,
                    service : BusinessService
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
    this.bsTypes = bsTypes;
    this.bsProjects = bsProjects;
    this.bsPrTasks = bsPrTasks;
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

  public setInvoices(invoices: Invoice[] | number) : Business{
    this.invoices = invoices;
    return this;
  }

  public setPlan(plan: Plan) : Business{
    this.plan = plan;
    return this;
  }

  public setBsClients(bsClients: bsClient[] | number) : Business{
    this.bsClients = bsClients;
    return this;
  }

  public setBsGeneralSettings(bsGeneralSettings: bsGeneralSettings) : Business{
    this.bsGeneralSettings = bsGeneralSettings;
    return this;
  }

  public setBsDocs(bsDocs: bsDoc[] | number) : Business{
    this.bsDocs = bsDocs;
    return this;
  }

  public setBsDocsCategories(bsDocsCategories: bsDocsCategory[] | number) : Business{
    this.bsDocsCategories = bsDocsCategories;
    return this;
  }

  public setBsEmployees(bsEmployees: bsEmployee[] | number) : Business{
    this.bsEmployees = bsEmployees;
    return this;
  }

  public setBsInvoices(bsInvoices: bsInvoice[] | number) : Business{
    this.bsInvoices = bsInvoices;
    return this;
  }

  public setBsKBCategories(bsKBCategories: bsKBCategory[] | number) : Business{
    this.bsKBCategories = bsKBCategories;
    return this;
  }

  public setBsKBs(bsKBs: bsKB[] | number) : Business{
    this.bsKBs = bsKBs;
    return this;
  }

  public setBsManagers(bsManagers: bsManager[] | number) : Business{
    this.bsManagers = bsManagers;
    return this;
  }

  public setBsPriorities(bsPriorities: bsPriority[] | number) : Business{
    this.bsPriorities = bsPriorities;
    return this;
  }

  public setBsStatuses(bsStatuses : bsStatus[] | number) : Business{
    this.bsStatuses = bsStatuses;
    return this;
  }

  public setBsTaskCategories(bsTaskCategories : bsTaskCategory[] | number) : Business{
    this.bsTaskCategories = bsTaskCategories;
    return this;
  }

  public setBsTypes(types : bsType[] | number) : Business{
    this.bsTypes = types;
    return this;
  }

  public setBsProjects(projects : bsProject[] | number) : Business{
    this.bsProjects = projects;
    return this;
  }

  public setBsPrTasks(tasks : bsPrTask[] | number) : Business{
    this.bsPrTasks = tasks;
    return this;
  }

  public build() : Business{
    return this;
  }

}
