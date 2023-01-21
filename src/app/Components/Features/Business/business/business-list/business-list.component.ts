import { Component, OnInit } from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {Business} from "../../../../../Model/Business/Business";
import {SortRequest} from "../../../../../Model/Shared/sortRequest";
import {FilterRequest} from "../../../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../../../Model/Shared/operationRequest";
import {PageRequest} from "../../../../../Model/Shared/pageRequest";
import {PageableResponse} from "../../../../../Model/Shared/PageableResponse";

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  private businesses : Business[];

  private sort : SortRequest[];

  private filter : FilterRequest[];

  private operationRequest : OperationRequest[];

  private pageRequest : PageRequest = new PageRequest();

  private pageableResponse : PageableResponse<Business>;

  constructor(private businessService : BusinessService) {

    this.sort = [
      {"property" : "id", "isAscending": true},
      {"property" : "name", "isAscending": true}
    ];
    this.operationRequest = [
      {"operator" : "=", "value" : "nat@gmail.com", "field" : "email"}
    ];
    this.filter = [
      {
        "field" : "client",
        "operations" : this.operationRequest
      }
    ];
    this.pageRequest.page = 0;
    this.pageRequest.size = 3;
    this.pageRequest.sort = this.sort;
    this.pageRequest.filter = this.filter;

    this.getAll();
  }

  ngOnInit(): void {
  }

  getAll() {

    return this.businessService.getPageListView(this.pageRequest).subscribe({
      next : (data) => {
        this.pageableResponse = data;
        console.log(this.pageableResponse);
      }
    });

  }

}
