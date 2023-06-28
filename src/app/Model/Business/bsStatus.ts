import {Business} from "./Business";
import {bsPrTask} from "../Project/bsPrTask";

export class bsStatus{

  public id : number | null;

  public name : string | null;

  public color : string | null;

  public business : Business | number | null;

  public tasks : bsPrTask[] | number | null;

  public bsStatus(
    id? : number | undefined | null,
    name? : string | undefined | null,
    color? : string | undefined | null,
    business? : Business | number | null,
    tasks? : bsPrTask[] | number | null
  ){
    if (id)
      this.id = id;
    if (name)
      this.name = name;
    if (color)
      this.color = color;
    if (business)
      this.business = business;
    if (tasks)
      this.tasks = tasks;
  }

}
