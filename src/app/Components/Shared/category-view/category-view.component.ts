import {Component, Input, OnInit} from '@angular/core';
import {ModelService} from "../../../Service/Shared/model.service";
import {LoginService} from "../../../Service/Shared/login.service";
import {ErrorHandlerService} from "../../../Service/Shared/error-handler.service";
import {User} from "../../../Model/Shared/User";
import {Category} from "../../../Model/Shared/category";
import {PageableResponse} from "../../../Model/Shared/PageableResponse";
import {PageRequest} from "../../../Model/Shared/pageRequest";
import {SortRequest} from "../../../Model/Shared/sortRequest";
import {BusinessService} from "../../../Service/Business/business.service";
import {FilterRequest} from "../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../Model/Shared/operationRequest";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent<T> implements OnInit {

  @Input() model : T;

  @Input() modelService : ModelService<T>;

  public categories : Category[] = [];

  private pageRequest : PageRequest = new PageRequest();

  private user : User | null;

  private pageableResponse : PageableResponse<T> = new PageableResponse<T>();

  constructor(
    private loginService : LoginService,
    private errorHandler : ErrorHandlerService,
    private businessService : BusinessService
  ) {
    this.pageRequest.page = 0;
    this.pageRequest.size = 20;

    const sort : SortRequest = new SortRequest();
    sort.isAscending = true;
    sort.property = "name";

    this.pageRequest.sort = [sort];

  }

  ngOnInit(): void {

    let filter : FilterRequest = new FilterRequest();
    filter.field = "business";

    let operation : OperationRequest = new OperationRequest();
    operation.field = "id";
    operation.value = this.businessService.getLoadedBusiness().toString();
    operation.operator = "=";

    filter.operations = [operation];

    this.pageRequest.filter = [filter];

    this.user = this.loginService.getActualUser() != null ? this.loginService.getActualUser() : null;
    this.getCategories();
  }

  private getCategories() : void {

    let data : PageableResponse<T>;

    console.log(this.pageRequest);

    this.modelService.getPageListView<T>(this.pageRequest).subscribe({
      next : (response) => {
        this.pageableResponse = response;
        data = response;
        console.log(data);
      }
    });

  }

}
