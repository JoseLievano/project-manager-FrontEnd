import {Business} from "../Business/Business";
import {bsTaskCategory} from "../Business/bsTaskCategory";
import {bsProject} from "./bsProject";
import {bsType} from "../Business/bsType";
import {bsPriority} from "../Business/bsPriority";
import {bsStatus} from "../Business/bsStatus";
import {bsInvoice} from "../Business/bsInvoice";

export class bsPrTask{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public description : String | undefined | null;

  public created : Date | undefined | null;

  public dueDate : Date | undefined | null;

  public isInternal : Boolean | undefined | null;

  public isOverDue : Boolean | undefined | null;

  public isDone : Boolean | undefined | null;

  public business : Business | undefined | null;

  public category : bsTaskCategory | undefined | null;

  public project : bsProject | undefined | null;

  public type : bsType | undefined | null;

  public priority : bsPriority | undefined | null;

  public status : bsStatus | undefined | null;

  public invoice : bsInvoice | undefined | null;

  public bsPrTask(
                  id : Number | undefined | null,
                  name : String | undefined | null,
                  description : String | undefined | null,
                  created : Date | undefined | null,
                  dueDate : Date | undefined | null,
                  isInternal : Boolean | undefined | null,
                  isOverDue : Boolean | undefined | null,
                  isDone : Boolean | undefined | null,
                  business : Business | undefined | null,
                  category : bsTaskCategory | undefined | null,
                  project : bsProject | undefined | null,
                  type : bsType | undefined | null,
                  priority : bsPriority | undefined | null,
                  status : bsStatus | undefined | null,
                  invoice : bsInvoice | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.description = description;
    this.created = created;
    this.dueDate = dueDate;
    this.isInternal = isInternal;
    this.isOverDue = isOverDue;
    this.isDone = isDone;
    this.business = business;
    this.category = category;
    this.project = project;
    this.type = type;
    this.priority = priority;
    this.status = status;
    this.invoice = invoice;
  }

  public builder() : bsPrTask{
    return new bsPrTask();
  }

  public setId(id : Number){
    this.id = id;
    return this;
  }

  public setName(name : String) : bsPrTask{
    this.name = name;
    return this;
  }

  public setDescription(description : String) : bsPrTask{
    this.description = description;
    return this;
  }

  public setCreated(created : Date) : bsPrTask{
    this.created = created;
    return this;
  }

  public setDueDate(dueDate : Date) : bsPrTask{
    this.dueDate = dueDate;
    return this;
  }

  public setInternal(isInternal : Boolean) : bsPrTask{
    this.isInternal = isInternal;
    return this;
  }

  public setOverDue(isOverDue : Boolean) : bsPrTask{
    this.isOverDue = isOverDue;
    return this;
  }

  public setDone(isDone : Boolean) : bsPrTask{
    this.isDone = isDone;
    return this;
  }

  public setBusiness(business : Business) : bsPrTask{
    this.business = business;
    return this;
  }

  public setCategory(category : bsTaskCategory) : bsPrTask{
    this.category = category;
    return this;
  }

  public setProject(project : bsProject) : bsPrTask{
    this.project = project;
    return this;
  }

  public setType(type : bsType) : bsPrTask{
    this.type = type;
    return this;
  }

  public setPriority(priority : bsPriority) : bsPrTask{
    this.priority = priority;
    return this;
  }

  public setStatus(status : bsStatus) : bsPrTask{
    this.status = status;
    return this;
  }

  public setInvoice(invoice : bsInvoice) : bsPrTask{
    this.invoice = invoice;
    return this;
  }

  public build() : bsPrTask{
    return this;
  }

}
