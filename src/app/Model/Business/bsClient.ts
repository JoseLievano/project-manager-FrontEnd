import {Business} from "./Business";
import {User} from "../Shared/User";

export class bsClient{

  public isActive : Boolean | undefined | null;

  public dateCreated : Date | undefined | null;

  public lastLogin : Date | undefined | null;

  public business : Business | undefined | null;

  public user : User | undefined | null;

  public bsClient(
                  isActive : Boolean | undefined | null,
                  dateCreated : Date | undefined | null,
                  lastLogin : Date | undefined | null,
                  business : Business | undefined | null,
                  user : User | undefined | null
  ){
    this.isActive = isActive;
    this.dateCreated = dateCreated;
    this.lastLogin = lastLogin;
    this.business = business;
    this.user = user;
  }

  static builder() : bsClient{
    return new bsClient();
  }

  public setIsActive(isActive: Boolean) : bsClient{
    this.isActive = isActive;
    return this;
  }

  public setDateCreated(dateCreated: Date) : bsClient{
    this.dateCreated = dateCreated;
    return this;
  }

  public setLastLogin(lastLogin: Date) : bsClient{
    this.lastLogin = lastLogin;
    return this;
  }

  public setBusiness(business: Business) : bsClient{
    this.business = business;
    return this;
  }

  public setUser(user: User) : bsClient{
    this.user = user;
    return this;
  }

  public build() : bsClient{
    return this;
  }

}
