import {User} from "../Shared/User";
import {Invoice} from "./Invoice";

export class Client extends User{

  public isActive : Boolean ;

  public lastLogin : Date  ;

  public invoice : Invoice[] ;


  public constructor(
                id ?: number | null | undefined,
                username ?: string,
                password ?: string | null | undefined,
                roles ?: String[] ,
                firstName ?: string,
                lastName ?: string ,
                email ?: string,
                isActive ?: Boolean,
                lastLogin ?: Date,
                invoice ?: Invoice[]
  ){
    super(id, username, password, roles, firstName, lastName, email);
    if (isActive)
      this.isActive = isActive;
    if (lastLogin)
      this.lastLogin = lastLogin;
    if (invoice)
      this.invoice = invoice;

  }

  static override builder() : Client{
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

  public override build () : Client{
    return this;
  }

}
