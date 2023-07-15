export class ActionModelEmit<T>{

  private actionType : string;
  private model : T;

  constructor(
    actionType : string,
    model : T
  ) {
    this.actionType = actionType;
    this.model = model;
  }

  public getAction() : string{
    return this.actionType;
  }

  public getModel() : T{
    return this.model;
  }

}
