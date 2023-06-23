import {Component, Input, OnInit} from '@angular/core';
import {ParagraphBlock} from "../../../../../Model/Shared/editor-content/editor-blocks/paragraphBlock";

@Component({
  selector: 'app-render-paragraph',
  templateUrl: './render-paragraph.component.html',
  styleUrls: ['./render-paragraph.component.css']
})
export class RenderParagraphComponent implements OnInit{

  @Input() dataRaw : any;

  public paragraphBlock : ParagraphBlock;

  ngOnInit(): void {
    this.paragraphBlock = new ParagraphBlock(this.dataRaw.id, this.dataRaw.type, this.dataRaw.data);
  }

}
