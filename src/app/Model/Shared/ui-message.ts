export class UiMessage {

  private message : string;

  private type : string;

  public UiMessage(message : string, type : string){
    this.message = message;
    this.type = type;
  }

  public getMessage() : string{
    return this.message;
  }

  public getType() : string{
    return this.type;
  }

}
