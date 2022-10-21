import {Business} from "./Business";
import {bsPrTask} from "../Project/bsPrTask";

export class bsTaskCategory{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public business : Business | undefined | null;

  public tasks : bsPrTask[] | undefined | null;

  public bsTaskCategory(
                        id : Number | undefined | null,
                        name : String | undefined | null,
                        business : Business | undefined | null,
                        tasks : bsPrTask[] | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.business = business;
    this.tasks = tasks;
  }

  static builder() : bsTaskCategory{
    return new bsTaskCategory();
  }

  public setID(id : Number) : bsTaskCategory{
    this.id = id;
    return this;
  }

  public setName(name : String) : bsTaskCategory{
    this.name = name;
    return this;
  }

  public setBusiness(business : Business) : bsTaskCategory{
    this.business = business;
    return this;
  }

  public setTasks(tasks : bsPrTask[]) : bsTaskCategory{
    this.tasks = tasks;
    return this;
  }

  public build() : bsTaskCategory{
    return this;
  }

}
