import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import EditorJS, {API} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import {EditorService} from "../../../../Service/Shared/editor.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  public editorJS: EditorJS;

  @Input() prevData: any;

  private editorID: number;

  @Output() editorIDChange: EventEmitter<number> = new EventEmitter<number>();

  @Output() contentHasChanged : EventEmitter<boolean> = new EventEmitter<boolean>();

  private synonymsForAwesome = [
    'awesome',
    'fantastic',
    'excellent',
    'incredible',
    'marvelous',
    'outstanding',
    'phenomenal',
    'remarkable',
    'splendid',
    'superb',
    'terrific',
    'wonderful',
    'astounding',
    'breathtaking',
    'awe-inspiring',
    'jaw-dropping',
    'mind-blowing',
    'stunning',
    'impressive',
    'dope',
    'stellar',
    'epic',
    'legendary',
    'majestic',
    'brilliant',
    'glorious',
    'extraordinary',
    'top-notch',
    'first-class',
    'superior',
    'sensational',
    'cool',
    'amazing',
    'fabulous',
    'tremendous',
    'unbelievable',
    'wicked',
    'killer',
    'phenom',
    'mind-boggling',
    'magic',
    'dazzling',
    'unreal',
    'legendary',
    'spectacular',
    'splendiferous',
    'kickass',
    'top-shelf',
    'top-drawer',
    'supreme',
    'radical',
    'ace',
    'sick',
    'slick',
    'perfect',
    'heavenly',
    'champion',
    'awe-striking',
    'mind-bending',
    'divine',
    'super-duper',
    'stellar',
    'solid',
    'smashing',
    'winning',
    'immaculate',
    'masterful',
    'grand',
    'majestic',
    'sweet',
    'exquisite',
    'jaw-dropping',
    'overwhelming',
    'mind-altering',
    'pulchritudinous',
    'A-1',
    'swell',
    'classy',
    'stupendous',
    'crazy',
    'fab',
    'bang-up',
    'shining',
    'incomparable',
    'hypnotic',
    'exalted',
    'splendorous',
    'spiffing',
    'topping',
    'knockout',
    'ravishing',
    'unbelievable',
    'swinging',
    'hot',
    'exemplary',
    'peerless',
    'groovy',
    'legendary',
    'dope',
    'on fire',
    'magic',
    'crushing',
    'top-of-the-line',
    'boss',
    'rad',
    'extra',
    'par excellence',
    'ace',
    'smashing',
    'stunning',
    'nifty',
    'first-rate',]

  private charEmojis = [
    "(｡◕‿‿◕｡)",
    "ʕ•ᴥ•ʔ",
    "ʕっ•ᴥ•ʔっ",
    "ʕ•̀ω•́ʔ✧",
    "（＾ｖ＾）",
    "(•‿•)",
    "(＾◡＾)",
    "(◠‿◠)",
    "(≧◡≦)",
    "(^_^)",
    "ヽ(＾Д＾)ﾉ",
    "（‐＾▽＾‐）",
    "(*^▽^*)",
    "(✿◠‿◠)",
    "(°◡°♡)",
    "٩(^‿^)۶",
    "(>‿◠)✌",
    "(¬‿¬)",
    "( ͡° ͜ʖ ͡°)",
    "(つ✧ω✧)つ",
    "(*≧ω≦)",
    "(´｡• ω •｡`)",
    "(っ＾▿＾)۶",
    "ヾ(＾-＾)ノ",
    "ヽ(´▽`)/",
    "٩(◕‿◕｡)۶",
    "(＾▽＾)",
    "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
    "(✿◠‿◠)",
    "(◕‿◕)",
    "(っ◔◡◔)っ",
    "(づ｡◕‿‿◕｡)づ",
    "(◕‿◕✿)",
    "(◠‿◠✿)",
    "╰(◕ᗜ◕)╯",
    "(｡♥‿♥｡)",
    "(っ＾ω＾)っ",
    "(◕ω◕✿)",
    "(っ˘ω˘ς)",
    "ヽ(•‿•)ノ",
    "ᕕ( ᐛ )ᕗ",
    "(◕‿-)",
    "(⌒‿⌒)",
    "⊂(◉‿◉)つ",
    "٩(◕‿◕｡)۶",
    "(✿ ♥‿♥)",
    "(⌐■_■)",
    "(｡♥‿♥｡)",
    "(｡♥‿♥｡)",
    "ლ(╹◡╹ლ)",
    "(◕‿◕)",
    "(♥ω♥*)",
    "(ง'̀-'́)ง",
    "(ᵔᴥᵔ)",
    "(つ≧▽≦)つ",
    "(✯◡✯)",
    "(｡♥‿♥｡)",
    "(๑>ᴗ<๑)",
    "(灬º‿º灬)",
    "(^̮^)",
    "(｡♥‿♥｡)",]

  constructor(
    private editorService: EditorService
  ) {
  }

  ngOnDestroy(): void {
        this.editorService.destroyEditor(this.editorID);
    }

  ngOnInit(): void {

    const randomIndexWords : number = Math.floor(Math.random() * this.synonymsForAwesome.length);

    const randomIndexEmojis : number = Math.floor(Math.random() * this.charEmojis.length);

    this.setEditorID();

    let actualData : any = undefined;

    if (this.prevData != undefined){
      actualData = JSON.parse(this.prevData);
    }
    this.editorJS = new EditorJS({
      holder : 'editorJs',
      data : actualData,
      minHeight : 20,
      onChange: (api, event) => {
        this.contentChanged();
      },
      tools : {
        header : {
          // @ts-ignore
          class : Header,
          inlineToolbar : true
        }
      },
      placeholder : "Let's write something " + this.synonymsForAwesome[randomIndexWords] + " " + this.charEmojis[randomIndexEmojis]
    });

    this.editorService.addToEditorList(this.editorID, this.editorJS);
  }

  public setEditorID(){
    this.editorID = Math.floor(Math.random() * 10000);
    this.editorIDChange.emit(this.editorID);
  }

  public contentChanged(){
    this.contentHasChanged.emit(true);
  }

}
