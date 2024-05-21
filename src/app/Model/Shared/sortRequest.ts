export class SortRequest{
  public property : string;

  public isAscending : boolean;

  constructor(
    property? : string,
    isAscending? : boolean
  ) {
    if (property)
      this.property = property;
    if (isAscending)
      this.isAscending = isAscending;
  }
}
