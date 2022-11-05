import { Component, OnInit } from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {Business} from "../../../../../Model/Business/Business";

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  private businesses : Business[];

  constructor(private businessService : BusinessService) {
    this.getAll();
  }

  ngOnInit(): void {
  }

  getAll() {
    return this.businessService.getAll().subscribe({
      next : (data) => {
        this.businesses = data;
        console.log("get all business");
        console.log(this.businesses);
      },
    });

  }

}
