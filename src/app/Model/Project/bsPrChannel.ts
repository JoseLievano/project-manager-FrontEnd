import {User} from "../Shared/User";
import {bsProject} from "./bsProject";

export class bsPrChannel{

  public id : Number | undefined | null;

  public name : String | undefined | null;

  public isPublic : Boolean | undefined | null;

  public creationDate : Date | undefined | null;

  public description : String | undefined | null;

  public author : User | undefined | null;

  public project : bsProject | undefined | null;

  public members : User[] | undefined | null;

  public bsPrChannel(
                      id : Number | undefined | null,
                      name : String | undefined | null,
                      isPublic : Boolean | undefined | null,
                      creationDate : Date | undefined | null,
                      description : String | undefined | null,
                      author : User | undefined | null,
                      project : bsProject | undefined | null,
                      members : User[] | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.isPublic = isPublic;
    this.creationDate = creationDate;
    this.description = description;
    this.author = author;
    this.project = project;
    this.members = members;
  }

  static builder() : bsPrChannel{
    return new bsPrChannel();
  }

  public setId(id : Number) : bsPrChannel{
    this.id = id;
    return this;
  }

  public setName(name : String) : bsPrChannel{
    this.name = name;
    return this;
  }

  public setIsPublic(isPublic : Boolean) : bsPrChannel{
    this.isPublic = isPublic;
    return this;
  }

  public setCreationDate(creationDate : Date) : bsPrChannel{
    this.creationDate = creationDate;
    return this;
  }

  public setDescription(description : String) : bsPrChannel{
    this.description = description;
    return this;
  }

  public setAuthor(author : User) : bsPrChannel{
    this.author = author;
    return this;
  }

  public setProject(project : bsProject) : bsPrChannel{
    this.project = project;
    return this;
  }

  public setMembers(members : User[]) : bsPrChannel{
    this.members = members;
    return this;
  }

  public build() : bsPrChannel{
    return this;
  }

}
