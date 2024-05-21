import {User} from "../Shared/User";

export class Admin{

  public user : User | undefined | null ;

  public Admin(
                user : User | undefined | null
  ){
    this.user = user;
  }

  static builder() : Admin{
    return new Admin();
  }

  public setUser (user : User) : Admin{
    this.user = user;
    return this;
  }

  public build () : Admin{
    return this;
  }

}
