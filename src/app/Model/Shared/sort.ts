export class Sort{
  public sorted : boolean;

  public unsorted : boolean;

  public empty : boolean;

  public Sort (
                sorted : boolean,
                unsorted : boolean,
                empty : boolean
  ){
    this.sorted = sorted;
    this.unsorted = unsorted;
    this.empty = empty;
  }
}
