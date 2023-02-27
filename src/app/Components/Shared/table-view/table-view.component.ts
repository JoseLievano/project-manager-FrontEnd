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

  public modelsArray: { [key: string]: any }[] | null | undefined;

  public modelsTransformed : { [key: string]: any }[];

  public modelKeys : string[];

  public objeto = {
    field1: 1,
    field2: 2,
    field3: 3
  };
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

  }

  ngOnInit(): void {
    this.pageAbleResponse = this.getPageResponse();
  }

  private getPageResponse() : PageableResponse<T>{

    let data : PageableResponse<T> = new PageableResponse<T>();

    this.modelService.getPageListView<T>(this.pageRequest, this.modelConst).subscribe({
      next : (response) => {
        data = response;
        // @ts-ignore
        this.modifyModels(data.content);
        // @ts-ignore
        this.modelKeys = Object.keys(this.modelsArray[0]);
      }
    });

    return data;
  }

  private modifyModels( data : { [key: string]: any }[] ){

    this.modelsArray = data;
    // @ts-ignore
    this.modelsTransformed = JSON.parse(JSON.stringify(data));

    this.modelsTransformed.forEach((model) => {

      let modelTomodify = model;

      for (let key in modelTomodify) {

        let insideValue = modelTomodify[key];

        if (key === "invoices"){
          console.log(insideValue);
        }

        if (insideValue != null && typeof insideValue === "object"){

          // @ts-ignore
          if (insideValue.hasOwnProperty("name")){
            // @ts-ignore
            modelTomodify[key] = insideValue.name;
          }// @ts-ignore
          else if (insideValue.hasOwnProperty("firstName")){
            // @ts-ignore
            modelTomodify[key] = insideValue.firstName;
          }
        }

      }
    });
    console.log("Model transformed")
    console.log(this.modelsTransformed)

    console.log("Normal model")
    console.log(this.modelsArray)

  }

}
