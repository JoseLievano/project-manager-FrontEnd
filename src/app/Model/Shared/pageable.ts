import {Sort} from "./sort";

export class Pageable{

  public sort : Sort;

  public offset : number;

  public pageNumber : number;

  public pageSize : number;

  public paged : boolean;

  public unpaged : boolean;

  public Pageable (
                    sort : Sort,
                    offset : number,
                    pageNumber : number,
                    pageSize : number,
                    paged : boolean,
                    unpaged : boolean
  ){
    this.sort = sort;
    this.offset = offset;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.paged = paged;
    this.unpaged = unpaged;
  }

}
