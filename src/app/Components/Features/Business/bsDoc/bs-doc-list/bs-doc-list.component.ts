import { Component, OnInit } from '@angular/core';
import {bsDoc} from "../../../../../Model/Business/bsDoc";
import {User} from "../../../../../Model/Shared/User";
import {BsDocService} from "../../../../../Service/Business/bs-doc.service";
import {LoginService} from "../../../../../Service/Shared/login.service";
import {bsDocsCategory} from "../../../../../Model/Business/bsDocsCategory";
import {BsDocsCategoryService} from "../../../../../Service/Business/bs-docs-category.service";

@Component({
  selector: 'app-bs-doc-list',
  templateUrl: './bs-doc-list.component.html',
  styleUrls: ['./bs-doc-list.component.css']
})
export class BsDocListComponent implements OnInit {

  public model : bsDocsCategory = new bsDocsCategory();

  private user : User | null;

  public contentModel : bsDoc = new bsDoc();

  constructor(public bsDocsCategoryService : BsDocsCategoryService,
              public bsDocService : BsDocService,
              private loginService : LoginService) {
    this.user = loginService.getActualUser();
  }

  ngOnInit(): void {
  }
}
