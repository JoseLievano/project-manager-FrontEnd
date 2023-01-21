import {SortRequest} from "./sortRequest";
import {FilterRequest} from "./filterRequest";
export class PageRequest{

  public page : number;

  public size : number;

  public sort : SortRequest[];

  public filter : FilterRequest[];

}

