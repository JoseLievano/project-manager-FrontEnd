import {Business} from "./Business";
import {bsPrTask} from "../Project/bsPrTask";

export class bsStatus{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public color : String | undefined | null;

  public business : Business | undefined | null;

  public tasks : bsPrTask[] | undefined | null;

  public bsStatus(
                  id : Number | undefined | null,
                  name : String | undefined | null,
                  color : String | undefined | null,
                  business : Business | undefined | null,
                  tasks : bsPrTask[] | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.color = color;
    this.business = business;
    this.tasks = tasks;
  }

  static builder() : bsStatus{
    return new bsStatus();
  }

  public setId(id: Number) : bsStatus{
    this.id = id;
    return this;
  }

  public setName(name: String) : bsStatus{
    this.name = name;
    return this;
  }

  public setColor(color: String) : bsStatus{
    this.color = color;
    return this;
  }

  public setBusiness(business: Business) : bsStatus{
    this.business = business;
    return this;
  }

  public setTasks(tasks : bsPrTask[]) : bsStatus{
    this.tasks = tasks;
    return this;
  }

  public build() : bsStatus{
    return this;
  }

}
