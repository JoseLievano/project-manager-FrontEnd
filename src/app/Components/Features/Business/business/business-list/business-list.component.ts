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

  constructor(private businessService : BusinessService,
              private loginService : LoginService,
              private modelService : ModelService) {

    let userId : Number | null | undefined = loginService.getActualUser()?.id;

  }

  ngOnInit(): void {
  }



}
