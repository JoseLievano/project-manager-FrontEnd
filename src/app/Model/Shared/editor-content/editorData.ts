import {IBlock} from "./editor-blocks/i-block";

export class editorData{

  public time : number;
  public blocks : IBlock[];
  public version : number;

  constructor(time? : number, blocks? : IBlock[], version? : number) {
    if (time)
      this.time = time;
    if (blocks)
      blocks = this.blocks;
    if (version)
      version = this.version;
  }
}
