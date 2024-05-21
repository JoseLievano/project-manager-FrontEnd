import {SortRequest} from "./sortRequest";
import {FilterRequest} from "./filterRequest";
export class PageRequest{

  public page : number;

  public size : number;

  public sort : SortRequest[] | null | undefined

  public filter : FilterRequest[] | null | undefined;

  constructor(
    page? : number,
    size? : number
  ) {
    if (page)
      this.page = page;

    if (size)
      this.size = size;
  }

}

