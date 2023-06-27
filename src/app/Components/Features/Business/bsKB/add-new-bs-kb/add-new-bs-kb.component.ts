import { Component } from '@angular/core';
import {bsKBCategory} from "../../../../../Model/Business/bsKBCategory";
import {bsKB} from "../../../../../Model/Business/bsKB";
import {BsKbCategoryService} from "../../../../../Service/Business/bs-kb-category.service";
import {BsKbService} from "../../../../../Service/Business/bs-kb.service";

@Component({
  selector: 'app-add-new-bs-kb',
  templateUrl: './add-new-bs-kb.component.html',
  styleUrls: ['./add-new-bs-kb.component.css']
})
export class AddNewBsKbComponent {

  public categoryModel : bsKBCategory = new bsKBCategory();

  public contentModel : bsKB = new bsKB();

  constructor(
    public categoryService : BsKbCategoryService,
    public contentModelService : BsKbService
  ) {
  }

}
