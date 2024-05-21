import {Business} from "./Business";
import {bsKBCategory} from "./bsKBCategory";
import {CatContent} from "../Shared/cat-content";

export class bsKB extends CatContent<bsKBCategory>{

  public constructor(
    category? : bsKBCategory | number,
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
