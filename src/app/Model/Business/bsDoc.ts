import {Business} from "./Business";
import {bsDocsCategory} from "./bsDocsCategory";
import {CatContent} from "../Shared/cat-content";

export class bsDoc extends CatContent<bsDocsCategory>{

  public constructor(
    category? : bsDocsCategory | number,
    business?: Business,
    content? : string,
    id? : number,
    title? : string
  ) {
    super();
    if (business)
      this.business = business;

    if (category)
      this.category = category;

    if (id)
      this.id = id;

    if (title)
      this.title = title;

    if (content)
      this.content = content;

  }
}
