import { Component, OnInit } from '@angular/core';
import {bsDocsCategory} from "../../../../../Model/Business/bsDocsCategory";
import {bsDoc} from "../../../../../Model/Business/bsDoc";
import {BsDocsCategoryService} from "../../../../../Service/Business/bs-docs-category.service";
import {BsDocService} from "../../../../../Service/Business/bs-doc.service";

@Component({
  selector: 'app-add-new-bs-doc',
  templateUrl: './add-new-bs-doc.component.html',
  styleUrls: ['./add-new-bs-doc.component.css']
})
export class AddNewBsDocComponent implements OnInit {

  public categoryModel : bsDocsCategory = new bsDocsCategory();

  public contentModel : bsDoc = new bsDoc();

  constructor(
    public categoryModelService : BsDocsCategoryService,
    public contentModelService : BsDocService
  ) { }

  ngOnInit(): void {
  }

}
