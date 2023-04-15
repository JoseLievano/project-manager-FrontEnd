export class User{
  public id : number | null | undefined;
  public username : string;
  public password : string | null | undefined;
  public roles : string [];
  public firstName : string;
  public lastName : string;
  public email : string;

  public constructor (
                id ?: number | null | undefined,
                username ?: string,
                password ?: string | null | undefined,
                roles ?: string[] ,
                firstName ?: string,
                lastName ?: string ,
                email ?: string
  ){
    this.id = id;
    if (username)
      this.username = username;
    if (password)
      this.password = password;
    if (roles)
      this.roles = roles;
    if (firstName)
      this.firstName = firstName;
    if (lastName)
      this.lastName = lastName;
    if (email)
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

  public setRoles (roles : string[]) : User{
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
