import { Component, OnInit } from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {Business} from "../../../../../Model/Business/Business";
import {SortRequest} from "../../../../../Model/Shared/sortRequest";
import {FilterRequest} from "../../../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../../../Model/Shared/operationRequest";
import {PageRequest} from "../../../../../Model/Shared/pageRequest";
import {PageableResponse} from "../../../../../Model/Shared/PageableResponse";
import {LoginService} from "../../../../../Service/Shared/login.service";
import {ModelService} from "../../../../../Service/Shared/model.service";
import {Const} from "../../../../../Constant/const";

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  public model : Business = new Business();

  public modelConst : String = "/business/";
  
  private businesses : Business[];

  private sort : SortRequest[];

  private filter : FilterRequest[];

  private operationRequest : OperationRequest[];

  private pageRequest : PageRequest = new PageRequest();

  private pageableResponse : PageableResponse<Business>;

  constructor(private businessService : BusinessService,
              private loginService : LoginService,
              private modelService : ModelService) {

    let userId : Number | null | undefined = loginService.getActualUser()?.id;

    //Check if userId is a number
    if (typeof userId === 'number'){

      this.operationRequest = [
        {
          "operator" : "=",
          "value" : userId.toString(),
          "field" : "id"}
      ];
    }else {
      this.operationRequest = [
        {
          "operator" : "=",
          "value" : "0",
          "field" : "id"}
      ];
    }

    this.filter = [
      {
        "field" : "client",
        "operations" : this.operationRequest
      }
    ];

    this.pageRequest.page = 0;
    this.pageRequest.size = 10;
    this.pageRequest.sort = this.sort;
    //this.pageRequest.filter = this.filter;
    //this.getAll();

    //Checking the new generi model
    this.getAllGeneric();
  }

  ngOnInit(): void {
  }

  getAllGeneric(){
    /*return this.modelService.getPageListView<Business>(this.pageRequest, new Business()).subscribe({
      next : (data)=> {
        this.pageableResponse = data;

      }
    })*/
  }

  getAll() {

    return this.businessService.getPageListView(this.pageRequest).subscribe({
      next : (data) => {
        this.pageableResponse = data;
        /*console.log(this.pageableResponse);*/
        if (this.pageableResponse.content != null){
          /*console.log("first Business name " + this.pageableResponse.content[0].name);*/
        }

      }
    });

  }

}
