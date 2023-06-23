import { Component } from '@angular/core';
import {bsDoc} from "../../../../../Model/Business/bsDoc";
import {bsDocsCategory} from "../../../../../Model/Business/bsDocsCategory";
import {BsDocService} from "../../../../../Service/Business/bs-doc.service";
import {BsDocsCategoryService} from "../../../../../Service/Business/bs-docs-category.service";

@Component({
  selector: 'app-edit-bs-doc',
  templateUrl: './edit-bs-doc.component.html',
  styleUrls: ['./edit-bs-doc.component.css']
})
export class EditBsDocComponent {

  public categoryModel : bsDocsCategory = new bsDocsCategory();

  public contentModel : bsDoc = new bsDoc();

  constructor(
    public contentModelService : BsDocService,
    public categoryModelService : BsDocsCategoryService
  ) {
  }

}
