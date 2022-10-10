export class User{
  public id : number | null;
  public username : string | null | undefined;
  public password : string | null | undefined;
  public roles : String [] | null;
  public firstName : string | null;
  public lastName : string | null;
  public email : string | null;

  public user (
    id : number | null,
    username : string | null,
    password : string | null,
    roles : String[] | null,
    firstName : string | null,
    lastName : string | null,
    email : string | null
  ){
    this.id = id;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

}
