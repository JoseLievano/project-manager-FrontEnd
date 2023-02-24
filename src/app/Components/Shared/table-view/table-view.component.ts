import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../../Service/Shared/login.service";
import {ModelService} from "../../../Service/Shared/model.service";
import {PageableResponse} from "../../../Model/Shared/PageableResponse";
import {SortRequest} from "../../../Model/Shared/sortRequest";
import {FilterRequest} from "../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../Model/Shared/operationRequest";
import {PageRequest} from "../../../Model/Shared/pageRequest";

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent<T> implements OnInit {

  @Input() model : T;

  @Input() modelConst : String;
  private sort : SortRequest[];

  private filter : FilterRequest[];

  private operationRequest : OperationRequest[];

  private pageRequest : PageRequest = new PageRequest();

  public pageAbleResponse : PageableResponse<T>;

  public modelsArray : T[] | null | undefined;

  public modelKeys : string[];

  constructor(
    private loginService : LoginService,
    private modelService : ModelService
  ) {

    //Set default sort
    this.sort = [
      { property : "id", isAscending : false}
    ]

    //Set default pageRequest
    this.pageRequest.page = 0;
    this.pageRequest.size = 10;
    this.pageRequest.sort = this.sort;

    console.log("TableViewComponent constructor" + this.modelConst)

  }

  ngOnInit(): void {
    console.log("Init TableViewComponent" + this.modelConst);
    this.pageAbleResponse = this.getPageResponse();
  }

  private getPageResponse() : PageableResponse<T>{

    let data : PageableResponse<T> = new PageableResponse<T>();

    this.modelService.getPageListView<T>(this.pageRequest, this.modelConst).subscribe({
      next : (response) => {
        data = response;
        this.modelsArray = data.content;
        console.log(this.modelsArray);
        // @ts-ignore
        this.modelKeys = Object.keys(this.modelsArray[0]);
      }
    });

    return data;
  }

}
