import {User} from "../Shared/User";
import {Invoice} from "./Invoice";

export class Client{

  public isActive : Boolean | undefined | null ;

  public lastLogin : Date | undefined | null ;

  public invoice : Invoice[] | undefined | null ;

  public user : User;

  public Client(
                isActive : Boolean | undefined | null ,
                lastLogin : Date | undefined | null ,
                invoice : Invoice[] | undefined | null ,
                user : User
  ){
    this.isActive = isActive;
    this.lastLogin = lastLogin;
    this.invoice = invoice;
    this.user = user;
  }

  static builder() : Client{
    return new Client();
  }

  public setIsActive (isActive : Boolean) : Client{
    this.isActive = isActive;
    return this;
  }

  public setLastLogin (lastLogin : Date) : Client{
    this.lastLogin = lastLogin;
    return this;
  }

  public setInvoice (invoice : Invoice[]) : Client{
    this.invoice = invoice;
    return this;
  }

  public setUser (user : User) : Client{
    this.user = user;
    return this;
  }

  public build () : Client{
    return this;
  }

}
