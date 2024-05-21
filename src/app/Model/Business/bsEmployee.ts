import {Business} from "./Business";
import {User} from "../Shared/User";

export class bsEmployee{

  public user : User | undefined | null;

  public dateCreated : Date | undefined | null;

  public lastLogin : Date | undefined | null;

  public business : Business | undefined | null;

  public bsEmployee(
                    user : User | undefined | null,
                    dateCreated : Date | undefined | null,
                    lastLogin : Date | undefined | null,
                    business : Business | undefined | null
  ){
    this.user = user;
    this.dateCreated = dateCreated;
    this.lastLogin = lastLogin;
    this.business = business;
  }

  static builder() : bsEmployee{
    return new bsEmployee();
  }

  public setUser (user : User) : bsEmployee{
    this.user = user;
    return this;
  }

  public setDateCreated (dateCreated : Date) : bsEmployee{
    this.dateCreated = dateCreated;
    return this;
  }

  public setLastLogin (lastLogin : Date) : bsEmployee{
    this.lastLogin = lastLogin;
    return this;
  }

  public setBusiness (business : Business) : bsEmployee{
    this.business = business;
    return this;
  }

  public build() : bsEmployee{
    return this;
  }

}
