import {bsPrComment} from "./bsPrComment";
import {User} from "../Shared/User";

export class bsPrMention{

  public id : Number | undefined | null;

  public mentionDate : Date | undefined | null;

  public comment : bsPrComment | undefined | null;

  public author : User | undefined | null;

  public mentionedUser : User | undefined | null;

  public bsPrMention(
                      id : Number | undefined | null,
                      mentionDate : Date | undefined | null,
                      comment : bsPrComment | undefined | null,
                      author : User | undefined | null,
                      mentionedUser : User | undefined | null
  ){
    this.id = id;
    this.mentionDate = mentionDate;
    this.comment = comment;
    this.author = author;
    this.mentionedUser = mentionedUser;
  }

  public builder() : bsPrMention{
    return new bsPrMention();
  }

  public setId(id : Number) : bsPrMention{
    this.id = id;
    return this;
  }

  public setMentionDate(mentionDate : Date) : bsPrMention{
    this.mentionDate = mentionDate;
    return this;
  }

  public setComment(comment : bsPrComment) : bsPrMention{
    this.comment = comment;
    return this;
  }

  public setAuthor(author : User) : bsPrMention{
    this.author = author;
    return this;
  }

  public setMentionedUser(mentionedUser : User) : bsPrMention{
    this.mentionedUser = mentionedUser;
    return this;
  }

  public build() : bsPrMention{
    return this;
  }

}
