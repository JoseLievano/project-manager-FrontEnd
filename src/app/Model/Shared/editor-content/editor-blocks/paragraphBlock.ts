import {IBlock} from "./i-block";
import {ParagraphTypeData} from "../editor-type-data/paragraphTypeData";

export class ParagraphBlock implements IBlock{

  id: number | null;
  type: string;
  data: ParagraphTypeData;

  constructor(
    id? : number | null,
    type? : string,
    data? : ParagraphTypeData
  ) {
    if (id)
      this.id = id;
    if (type)
      this.type = type;
    if (data)
      this.data = data;
  }

}
