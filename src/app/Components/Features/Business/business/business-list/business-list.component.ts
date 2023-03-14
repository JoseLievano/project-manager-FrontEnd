import { Component, OnInit } from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {Business} from "../../../../../Model/Business/Business";
import {LoginService} from "../../../../../Service/Shared/login.service";
import {ModelService} from "../../../../../Service/Shared/model.service";

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
