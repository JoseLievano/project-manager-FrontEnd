import {Business} from "./Business";
import {bsDoc} from "./bsDoc";
import {Category} from "../Shared/category";

export class bsDocsCategory extends Category{

  private business : Business;

  private bsDocs : bsDoc[] | null;

  public constructor(
    id? : number | null,
    name? : string,
    description? : string,
    business? : Business,
    bsDocs? : bsDoc[]
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


  override setContent() {
    if (this.bsDocs)
      this.content = this.bsDocs;
  }
}
