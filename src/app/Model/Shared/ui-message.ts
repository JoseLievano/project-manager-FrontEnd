export class UiMessage {

  private readonly message : string;

  private readonly type : string;

  public constructor(message? : string, type? : string){
    if (message !== undefined && type !== undefined){
      this.message = message;
      this.type = type;
    }
  }

  public getMessage() : string{
    return this.message;
  }

  public getType() : string{
    return this.type;
  }

}
