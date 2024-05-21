import {ITypeData} from "./i-type-data";

export class ParagraphTypeData implements ITypeData{

  public text : string;

  constructor(text? : string) {
    if (text)
      this.text = text;
  }

}
