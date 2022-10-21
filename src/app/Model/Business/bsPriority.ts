import {Business} from "./Business";
import {bsPrTask} from "../Project/bsPrTask";

export class bsPriority{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public priorityOrder : Number | undefined | null;

  public business : Business | undefined | null;

  public tasks : bsPrTask[] | undefined | null;

  public bsPriority (
                      id : Number | undefined | null,
                      name : String | undefined | null,
                      priorityOrder : Number | undefined | null,
                      business : Business | undefined | null,
                      tasks : bsPrTask[] | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.priorityOrder = priorityOrder;
    this.business = business;
    this.tasks = tasks;
  }

  static builder() : bsPriority{
    return new bsPriority();
  }

  public setId(id: Number) : bsPriority{
    this.id = id;
    return this;
  }

  public setName(name: String) : bsPriority{
    this.name = name;
    return this;
  }

  public setPriorityOrder(priorityOrder: Number) : bsPriority{
    this.priorityOrder = priorityOrder;
    return this;
  }

  public setBusiness(business: Business) : bsPriority{
    this.business = business;
    return this;
  }

  public setTasks(tasks : bsPrTask[]) : bsPriority{
    this.tasks = tasks;
    return this;
  }

  public build() : bsPriority{
    return this;
  }

}
