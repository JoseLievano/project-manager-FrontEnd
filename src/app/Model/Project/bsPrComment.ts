import {User} from "../Shared/User";
import {bsPrChannel} from "./bsPrChannel";
import {bsProject} from "./bsProject";
import {bsPrMention} from "./bsPrMention";

export class bsPrComment{

  public id : Number | undefined | null;

  public commentContent : String | undefined | null;

  public commentDate : Date | undefined | null;

  public author : User | undefined | null;

  public channel : bsPrChannel | undefined | null;

  public project : bsProject | undefined | null;

  public mentions : bsPrMention[] | undefined | null;

  public bsPrComment(
                      id : Number | undefined | null,
                      commentContent : String | undefined | null,
                      commentDate : Date | undefined | null,
                      author : User | undefined | null,
                      channel : bsPrChannel | undefined | null,
                      project : bsProject | undefined | null,
                      mentions : bsPrMention[] | undefined | null
  ){
    this.id = id;
    this.commentContent = commentContent;
    this.commentDate = commentDate;
    this.author = author;
    this.channel = channel;
    this.project = project;
    this.mentions = mentions;
  }

  static builder() : bsPrComment{
    return new bsPrComment();
  }

  public setId(id : Number) : bsPrComment{
    this.id = id;
    return this;
  }

  public setCommentContent(commentContent : String) : bsPrComment{
    this.commentContent = commentContent;
    return this;
  }

  public setCommentDate(commentDate : Date) : bsPrComment{
    this.commentDate = commentDate;
    return this;
  }

  public setAuthor(author : User) : bsPrComment{
    this.author = author;
    return this;
  }

  public setChannel(channel : bsPrChannel) : bsPrComment{
    this.channel = channel;
    return this;
  }

  public setMentions(mentions : bsPrMention[]) : bsPrComment{
    this.mentions = mentions;
    return this;
  }

  public setProject(project : bsProject) : bsPrComment{
    this.project = project;
    return this;
  }

  public build() : bsPrComment{
    return this;
  }

}
