export class User{
  public id : number | null | undefined;
  public username : string | null | undefined;
  public password : string | null | undefined;
  public roles : String [] | null | undefined;
  public firstName : string | null | undefined;
  public lastName : string | null | undefined;
  public email : string | null | undefined;

  public user (
    id : number | null | undefined,
    username : string | null | undefined,
    password : string | null | undefined,
    roles : String[] | null | undefined,
    firstName : string | null | undefined,
    lastName : string | null | undefined,
    email : string | null | undefined
  ){
    this.id = id;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  static builder() : User{
    return new User();
  }

  public setId (id : number) : User{
    this.id = id;
    return this;
  }

  public setUsername (username : string) : User{
    this.username = username;
    return this;
  }

  public setPassword (password : string) : User{
    this.password = password;
    return this;
  }

  public setRoles (roles : String[]) : User{
    this.roles = roles;
    return this;
  }

  public setFirstName (firstName : string) : User{
    this.firstName = firstName;
    return this;
  }

  public setLastName (lastName : string) : User{
    this.lastName = lastName;
    return this;
  }

  public setEmail (email : string) : User{
    this.email = email;
    return this;
  }

  public build() : User{
    return this;
  }

}
