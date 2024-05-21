import {Pageable} from "./pageable";
import {Sort} from "./sort";

export class PageableResponse<T>{

  public content : T[] | null | undefined;

  public pageable : Pageable;

  public last : boolean;

  public totalPages : number;

  public totalElements : number;

  public size : number;

  public sort : Sort;

  public number : number;

  public first : boolean;

  public numberOfElements : number;

  public empty : boolean;

  public PageableResponse (
                            content : T[] | null | undefined,
                            pageable : Pageable,
                            last : boolean,
                            totalPages : number,
                            totalElements : number,
                            size : number,
                            sort : Sort,
                            number : number,
                            first : boolean,
                            numberOfElements : number,
                            empty : boolean
  ){
    this.content = content;
    this.pageable = pageable;
    this.last = last;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.size = size;
    this.sort = sort;
    this.number = number;
    this.first = first;
    this.numberOfElements = numberOfElements;
    this.empty = empty;
  }

}
