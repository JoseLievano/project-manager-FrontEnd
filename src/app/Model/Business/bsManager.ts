import {Business} from "./Business";
import {User} from "../Shared/User";

export class bsManager{

  public dateCreated : Date | undefined | null;

  public lastLogin : Date | undefined | null;

  public business : Business | undefined | null;

  public user : User | undefined | null;

  public bsManager(
                  dateCreated : Date | undefined | null,
                  lastLogin : Date | undefined | null,
                  business : Business | undefined | null,
                  user : User | undefined | null
  ){
    this.dateCreated = dateCreated;
    this.lastLogin = lastLogin;
    this.business = business;
    this.user = user;
  }

  static builder() : bsManager{
    return new bsManager();
  }

  public setDateCreated(dateCreated: Date) : bsManager{
    this.dateCreated = dateCreated;
    return this;
  }

  public setLastLogin(lastLogin: Date) : bsManager{
    this.lastLogin = lastLogin;
    return this;
  }

  public setBusiness(business: Business) : bsManager{
    this.business = business;
    return this;
  }

  public setUser(user: User) : bsManager{
    this.user = user;
    return this;
  }

  public build() : bsManager{
    return this;
  }

}
