import {User} from "../Shared/User";

export class Employee{

  public user : User | undefined | null ;

  public Employee(
                  user : User | undefined | null
  ){
    this.user = user;
  }

  static builder() : Employee{
    return new Employee();
  }

  public setUser (user : User) : Employee{
    this.user = user;
    return this;
  }

  public build () : Employee{
    return this;
  }

}
