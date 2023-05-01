import {Business} from "./Business";
import {bsDocsCategory} from "./bsDocsCategory";
import {CatContent} from "../Shared/cat-content";

export class bsDoc extends CatContent{

  public business : Business | null;

  public bsDocCategory : bsDocsCategory | null;

  public constructor(
    business?: Business,
    bsDocCategory? : bsDocsCategory,
    id? : number,
    title? : string,
    content? : string
  ) {
    super();
    if (business)
      this.business = business;

    if (bsDocCategory){
      this.bsDocCategory = bsDocCategory;
      this.category = bsDocCategory;
    }

    if (id)
      this.id = id;

    if (title)
      this.title = title;

    if (content)
      this.content = content;

  }


  override setContent() {
    if (this.bsDocCategory)
      this.category = this.bsDocCategory;
  }
}
