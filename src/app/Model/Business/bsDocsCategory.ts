import {Business} from "./Business";
import {bsDoc} from "./bsDoc";
import {Category} from "../Shared/category";
import {CatContent} from "../Shared/cat-content";

export class bsDocsCategory extends Category<bsDocsCategory>{

  public bsDocs : bsDoc[] | null;

  public constructor(
    id? : number | null,
    name? : string,
    description? : string,
    isAParentCategory ? : boolean,
    level? : number,
    parentCategory? : bsDocsCategory | number,
    business? : Business | number,
    subCategories? : bsDocsCategory[],
    bsDocs? : bsDoc[],
    ) {
    super();
    if (id)
      this.id = id;

    if (name)
      this.name = name;

    if (description)
      this.description = description;

    if (business)
      this.business = business;

    if (bsDocs)
      this.bsDocs = bsDocs;

  }

  public override setContent() {
    if (this.bsDocs)
      this.content = this.bsDocs;
  }

  public override getContent() : CatContent<bsDocsCategory>[] {
    return this.bsDocs != null ? this.bsDocs : [];
  }
}
