import {bsClient} from "./bsClient";
import {Business} from "./Business";
import {bsPrTask} from "../Project/bsPrTask";

export class bsInvoice{

  public id : Number | undefined | null;

  public dateGenerated : Date | undefined | null;

  public limitDate : Date | undefined | null;

  public amount : number;

  public isPaid : Boolean | undefined | null;

  public isOverDue : Boolean | undefined | null;

  public number : String | undefined | null;

  public client : bsClient | undefined | null;

  public business : Business | undefined | null;

  public task : bsPrTask[] | undefined | null;

  public bsInvoice(
                    id : Number | undefined | null,
                    dateGenerated : Date | undefined | null,
                    limitDate : Date | undefined | null,
                    amount : number,
                    isPaid : Boolean | undefined | null,
                    isOverDue : Boolean | undefined | null,
                    number : String | undefined | null,
                    client : bsClient | undefined | null,
                    business : Business | undefined | null,
                    task : bsPrTask[] | undefined | null
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
    this.task = task;
  }




}
