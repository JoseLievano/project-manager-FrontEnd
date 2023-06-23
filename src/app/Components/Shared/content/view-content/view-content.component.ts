import {Component, Input, OnInit} from '@angular/core';
import {ModelService} from "../../../../Service/Shared/model.service";
import {editorData} from "../../../../Model/Shared/editor-content/editorData";
import {Category} from "../../../../Model/Shared/category";
import {CatContent} from "../../../../Model/Shared/cat-content";
import {ErrorHandlerService} from "../../../../Service/Shared/error-handler.service";
import {editorBlockType} from "../../../../Constant/editor-block-type";

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentComponent<T extends Category<T>, C extends CatContent<T>> implements OnInit{

  @Input() model : C;

  @Input() modelService : ModelService<C>;

  @Input() categoryModel : T;

  @Input() modelId : number;

  public data : editorData;

  constructor(private errorHandlerService : ErrorHandlerService) {}

  ngOnInit(): void {
    this.modelService.getOne<C>(this.modelId).subscribe({
      next : (response : C) => {
        this.model = response;
        this.data = JSON.parse(response.content);
      },
      error : (e) => {
        this.errorHandlerService.processError(e.error);
      }
    });
  }

  protected readonly editorBlockType = editorBlockType;
}
