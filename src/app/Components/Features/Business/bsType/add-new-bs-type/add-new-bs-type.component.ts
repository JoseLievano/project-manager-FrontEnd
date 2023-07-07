import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {BsTypeService} from "../../../../../Service/Business/bs-type.service";
import {BsTaskCategoryService} from "../../../../../Service/Business/bs-task-category.service";

@Component({
  selector: 'app-add-new-bs-type',
  templateUrl: './add-new-bs-type.component.html',
  styleUrls: ['./add-new-bs-type.component.css']
})
export class AddNewBsTypeComponent implements OnInit{

  constructor(
    private businessService : BusinessService,
    private bsTypeService : BsTypeService,
    private bsTaskCategoryService : BsTaskCategoryService
  ) {
  }
  ngOnInit(): void {
  }

}
