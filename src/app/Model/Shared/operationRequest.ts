export class OperationRequest{

  public operator : string;

  public value : string;

  public field : string;

  constructor(
    operator? : string,
    value? : string,
    field? : string
  ) {

    if (operator)
      this.operator = operator;

    if (value)
      this.value = value;

    if (field)
      this.field = field;

  }

}
