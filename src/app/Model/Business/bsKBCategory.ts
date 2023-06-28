import {Business} from "./Business";
import {bsKB} from "./bsKB";
import {Category} from "../Shared/category";
import {CatContent} from "../Shared/cat-content";

export class bsKBCategory extends Category<bsKBCategory>{

  public bsKBs : bsKB[] | null;

  public constructor(
    id? : number | null,
    name? : string,
    description? : string,
    isAParentCategory ? : boolean,
    level? : number,
    parentCategory? : bsKBCategory | number,
    business? : Business | number,
    subCategories? : bsKBCategory[],
    bsKBs? : bsKB[]
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

    if (bsKBs)
      this.bsKBs = bsKBs;
  }

  public override setContent() {
    if (this.bsKBs)
      this.content = this.bsKBs;
  }

  public override getContent(): CatContent<bsKBCategory>[] {
    return this.bsKBs != null ? this.bsKBs : [];
  }

}
