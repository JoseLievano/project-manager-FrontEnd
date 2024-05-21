import {User} from "../Shared/User";
import {Invoice} from "./Invoice";

export class Client extends User{

  public isActive : Boolean | null;

  public dateCreated : Date | null;

  public lastLoginDate : Date | null;

  public invoice : Invoice[] | number[] | null;


  public constructor(
    id ?: number | null ,
    firstName ?: string ,
    lastName ?: string ,
    email ?: string,
    roles ?: string[],
    password ?: string | null,
    username ?: string,
    accountNonExpired ?: boolean,
    accountNonLocked ?: boolean,
    credentialsNonExpired ?: boolean,
    enabled ?: boolean,
    isActive ?: boolean | null,
    dateCreated ?: Date | null,
    lastLoginDate ?: Date | null,
    invoice ?: Invoice[] | number[] | null
  ){
    super(id, firstName, lastName, email, roles, password, username, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled);
    if (isActive)
      this.isActive = isActive;
    if (dateCreated)
      this.dateCreated = dateCreated;
    if (lastLoginDate)
      this.lastLoginDate = lastLoginDate;
    if (invoice)
      this.invoice = invoice;

  }

}
