import {Business} from "./Business";
import {bsPrTask} from "../Project/bsPrTask";

export class bsPriority{

  public id : number | null;

  public name : string | null;

  public priorityOrder : number | null;

  public business : Business | number | null;

  public tasks : bsPrTask[] | number | null;

  public constructor (
    id? : number | null,
    name? : string | null,
    priorityOrder? : number | null,
    business? : Business | number | null,
    tasks? : bsPrTask[] | null
  ){
    if (id)
      this.id = id;

    if (name)
      this.name = name;

    if (priorityOrder)
      this.priorityOrder = priorityOrder;

    if (business)
      this.business = business;

    if (tasks)
      this.tasks = tasks;
  }

}
