import {Business} from "./Business";
import {bsDocsCategory} from "./bsDocsCategory";
import {CatContent} from "../Shared/cat-content";

export class bsDoc extends CatContent{

  public business : Business | null;

  public bsDocsCategory : bsDocsCategory | null;

  public constructor(
    bsDocsCategory? : bsDocsCategory,
    business?: Business,
    content? : string,
    id? : number,
    title? : string
  ) {
    super();
    if (business){
      this.business = business;
    }

    if (bsDocsCategory){
      this.bsDocsCategory = bsDocsCategory;
      this.category = bsDocsCategory;
    }

    if (id)
      this.id = id;

    if (title)
      this.title = title;

    if (content)
      this.content = content;

  }

  override setCategory() {
    if (this.bsDocsCategory)
      this.category = this.bsDocsCategory;
  }
}
