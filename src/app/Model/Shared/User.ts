export class User{
  public id : number | null;
  public firstName : string | null;
  public lastName : string | null;
  public email : string;
  public roles : string [];
  public password : string | null;
  public username : string;
  public accountNonExpired : boolean;
  public accountNonLocked : boolean;
  public credentialsNonExpired : boolean;
  public enabled : boolean;

  public constructor (
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
    enabled ?: boolean
  ){
    if (id)
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
    if (accountNonExpired)
      this.accountNonExpired = accountNonExpired;
    if (accountNonLocked)
      this.accountNonLocked = accountNonLocked;
    if (credentialsNonExpired)
      this.credentialsNonExpired = credentialsNonExpired;
    if (enabled)
      this.enabled = enabled;
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
