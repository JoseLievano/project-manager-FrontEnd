import { Component } from '@angular/core';
import {bsKBCategory} from "../../../../../Model/Business/bsKBCategory";
import {User} from "../../../../../Model/Shared/User";
import {bsKB} from "../../../../../Model/Business/bsKB";
import {BsKbCategoryService} from "../../../../../Service/Business/bs-kb-category.service";
import {BsKbService} from "../../../../../Service/Business/bs-kb.service";
import {LoginService} from "../../../../../Service/Shared/login.service";

@Component({
  selector: 'app-bs-kb-list',
  templateUrl: './bs-kb-list.component.html',
  styleUrls: ['./bs-kb-list.component.css']
})
export class BsKbListComponent {

  public model : bsKBCategory = new bsKBCategory();

  public contentModel : bsKB = new bsKB();

  private user : User | null;

  constructor(
    public bsKBCategoryService : BsKbCategoryService,
    public bsKBService : BsKbService,
    private loginService : LoginService
  ) {
    this.user = loginService.getActualUser();
  }

}
