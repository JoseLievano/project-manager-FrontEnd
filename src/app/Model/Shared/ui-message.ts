export class UiMessage {

  public message : string;

  public type : string;

  public constructor(message? : string, type? : string){
    if (message !== undefined && type !== undefined){
      this.message = message;
      this.type = type;
    }
  }

}
