import {IBlock} from "./i-block";
import {HeaderTypeData} from "../editor-type-data/headerTypeData";

export class HeaderBlock implements IBlock{

  id : number | null;
  type : string;
  data : HeaderTypeData;

  constructor(id? : number, type? : string, data? : HeaderTypeData) {
    if (id)
      this.id = id;

    if (type)
      this.type = type;

    if (data)
      this.data = data;
  }

}
