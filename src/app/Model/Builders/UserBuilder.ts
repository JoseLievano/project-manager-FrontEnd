import {User} from "../User";

export class UserBuilder{

  private user : User;

  constructor(){

  }

  public id(id : number){
    this.user.id = id;
    return this;
  }

  public username(username : string){
    this.user.username = username;
    return this;
  }

  public password(password : string){
    this.user.password = password;
    return this;
  }

  public roles(roles : String[]){
    this.user.roles = roles;
    return this;
  }

  public firstName(firstName : string){
    this.user.firstName = firstName;
    return this;
  }

  public lastName(lastName : string){
    this.user.lastName = lastName;
    return this;
  }

  public email(email : string){
    this.user.email = email;
    return this;
  }

  public build(){
    return this.user;
  }

}
