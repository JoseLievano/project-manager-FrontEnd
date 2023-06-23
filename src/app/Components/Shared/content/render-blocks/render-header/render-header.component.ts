import {Component, Input, OnInit} from '@angular/core';
import {HeaderBlock} from "../../../../../Model/Shared/editor-content/editor-blocks/headerBlock";

@Component({
  selector: 'app-render-header',
  templateUrl: './render-header.component.html',
  styleUrls: ['./render-header.component.css']
})
export class RenderHeaderComponent implements OnInit{

  @Input() dataRaw : any;

  public headerBlock : HeaderBlock;

  constructor() {

  }

  ngOnInit(): void {
    this.headerBlock = new HeaderBlock(this.dataRaw.id, this.dataRaw.type, this.dataRaw.data);
  }

}
