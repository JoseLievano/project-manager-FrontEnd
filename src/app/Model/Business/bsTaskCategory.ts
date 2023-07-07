import {Business} from "./Business";
import {bsPrTask} from "../Project/bsPrTask";
import {bsType} from "./bsType";

export class bsTaskCategory{

  public id : number | null;

  public name : string | undefined | null;

  public business : Business | number | null;

  public types : bsType[] | number | null;

  public tasks : bsPrTask[] | number | null;

  public constructor(
    id? : number | null,
    name? : string | null,
    business? : Business | number | null,
    types? : bsType[] | number | null,
    tasks? : bsPrTask[] | number | null
  ){
    if (id)
      this.id = id;

    if (name)
      this.name = name;

    if (business)
      this.business = business;

    if (types)
      this.types = types;

    if (tasks)
      this.tasks = tasks;
  }


}
