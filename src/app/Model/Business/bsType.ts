import {Business} from "./Business";
import {bsPrTask} from "../Project/bsPrTask";
import {bsTaskCategory} from "./bsTaskCategory";

export class bsType{

  public id : number | null;

  public name : string | null;

  public business : Business | number | null;

  public taskCategories : bsTaskCategory[] | number[] |number | null;

  public tasks : bsPrTask[] | number | null;

  public constructor(
    id? : number | null,
    name? : string | null,
    business? : Business | number | null,
    taskCategories ? : bsTaskCategory[] | number | null,
    tasks? : bsPrTask[] | number | null
  ){
    if (id)
      this.id = id;
    if (name)
      this.name = name;
    if (business)
      this.business = business;
    if (taskCategories)
      this.taskCategories = taskCategories;
    if (tasks)
      this.tasks = tasks;
  }

}
