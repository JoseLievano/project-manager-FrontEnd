import { Component } from '@angular/core';
import {bsKBCategory} from "../../../../../Model/Business/bsKBCategory";
import {bsKB} from "../../../../../Model/Business/bsKB";
import {BsKbService} from "../../../../../Service/Business/bs-kb.service";
import {BsKbCategoryService} from "../../../../../Service/Business/bs-kb-category.service";

@Component({
  selector: 'app-edit-bs-kb',
  templateUrl: './edit-bs-kb.component.html',
  styleUrls: ['./edit-bs-kb.component.css']
})
export class EditBsKbComponent {

  public categoryModel : bsKBCategory = new bsKBCategory();

  public contentModel : bsKB = new bsKB();

  constructor(
    public contentModelService : BsKbService,
    public categoryModelService : BsKbCategoryService
  ) {
  }

}
