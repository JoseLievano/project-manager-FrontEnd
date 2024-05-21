import {ITypeData} from "../editor-type-data/i-type-data";

export interface IBlock{
  id : number | null;
  type : string;
  data : ITypeData;
}
