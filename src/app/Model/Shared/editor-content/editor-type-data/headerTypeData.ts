import {ITypeData} from "./i-type-data";

export class HeaderTypeData implements ITypeData{

  text : string;
  level : number;

  constructor(text? : string, level? : number) {
    if (text)
      this.text = text;
    if (level)
      this.level = level;
  }
}
