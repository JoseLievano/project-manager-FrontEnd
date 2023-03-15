import { Component, OnInit } from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {Business} from "../../../../../Model/Business/Business";
import {LoginService} from "../../../../../Service/Shared/login.service";
import {ModelService} from "../../../../../Service/Shared/model.service";
import {User} from "../../../../../Model/Shared/User";

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  public model : Business = new Business();

  public modelConst : String = "/business/";

  private user : User | null;

  constructor(public businessService : BusinessService,
              private loginService : LoginService) {

    let userId : Number | null | undefined = loginService.getActualUser()?.id;

    this.user = loginService.getActualUser();
  }

  ngOnInit(): void {

    if (this.user != null){
      // @ts-ignore
      console.log(this.user.roles[0])
    }

  }

}
