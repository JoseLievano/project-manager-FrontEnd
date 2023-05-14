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
export class CategoryViewComponent<T extends Category, C> implements OnInit {

  @Input() model : T;

  @Input() modelService : ModelService<T>;

  @Input() contentModel : C;

  @Input() contentModelService : ModelService<C>;

  public contentFilter : FilterRequest[] = [];

  public categoryHasContent : boolean = false;

  public actualCategory : Category | null = null;

  public categoryLoaded : boolean = false;

  public categories : Category[] = [];

  private pageRequest : PageRequest = new PageRequest();

  private user : User | null;

  private pageableResponse : PageableResponse<T> = new PageableResponse<T>();

  public breadCrumbsCats : {id : number, name : string}[] = [];

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
    this.setDefaultPageRequestFilters();
    this.user = this.loginService.getActualUser() != null ? this.loginService.getActualUser() : null;
    this.getCategories();
  }

  private getCategories() : void {

    let data : PageableResponse<T>;

    this.modelService.getPageListView<T>(this.pageRequest).subscribe({
      next : (response) => {
        console.log(this.pageRequest.filter);
        console.log("Response");
        console.log(response);
        this.pageableResponse = response;
        // @ts-ignore
        this.categories = response.content;
      }
    });
  }

  private setDefaultPageRequestFilters() : void {
    let filter : FilterRequest = new FilterRequest();
    filter.field = "business";

    let operation : OperationRequest = new OperationRequest();
    operation.field = "id";
    operation.value = this.businessService.getLoadedBusiness().toString();
    operation.operator = "=";

    filter.operations = [operation];

    this.pageRequest.filter = [
      {
        "field" : "business",
        "operations" : [
          {
            "operator" : "=",
            "value" : this.businessService.getLoadedBusiness().toString(),
            "field": "id"
          }
        ]
      },
      {
        "field" : "level",
        "operations" : [
          {
            "operator" : "=",
            "value" : "0",
            "field" : "level"
          }
        ]
      }
    ];
  }

  private setActualCategory(id : number) : void{

    this.categoryLoaded = false;

    this.modelService.getOne<Category>(id).subscribe({
      next : (response : Category) => {
        this.actualCategory = response;
        this.getActualCategoryContent();
        this.getSubCategories();
        // @ts-ignore
        this.checkBreadCrumbs({id : this.actualCategory.id, name: this.actualCategory.name});
      }
    })

  }

  public viewCategory(id : number | null){
    if (id){
      this.setActualCategory(id);
    }
  }

  private getActualCategoryContent(){

    this.contentFilter = [];

    let actualOperations : OperationRequest = new OperationRequest();
    actualOperations.field = "id";
    // @ts-ignore
    actualOperations.value = this.actualCategory?.id.toString();
    actualOperations.operator = "=";


    this.contentFilter = [
      {
        "field" : "category",
        "operations" : [actualOperations]
      }
    ]

    this.categoryLoaded = true;

  }

  private getSubCategories(){

    if (this.categoryLoaded){

      this.pageRequest.filter = [];

      this.pageRequest.filter = [
        {
          "field": "parentCategory",
          "operations": [
            {
              "operator": "=",
              // @ts-ignore
              "value": this.actualCategory.id.toString(),
              "field": "id"
            }
          ]
        },
        {
          "field" : "business",
          "operations" : [
            {
              "operator" : "=",
              "value" : this.businessService.getLoadedBusiness().toString(),
              "field": "id"
            }
          ]
        },
        {
          "field" : "level",
          "operations" : [
            {
              "operator" : "=",
              // @ts-ignore
              "value" : (this.actualCategory.level + 1).toString(),
              "field" : "level"
            }
          ]
        }
      ]

      this.getCategories();

    }
  }

  public goHomeCategory() : void{
    this.actualCategory = null;
    this.categoryLoaded = false;
    this.pageRequest.filter = [];
    this.breadCrumbsCats = [];
    this.setDefaultPageRequestFilters();
    this.getCategories();
  }

  public checkBreadCrumbs(category : {id : number, name : string}) : void {

    const isAlreadyInTheList : boolean = this.breadCrumbsCats.findIndex((cat) => cat.id == category.id && cat.name == category.name) != -1;

    if (isAlreadyInTheList){

      const actualIndex : number = this.breadCrumbsCats.findIndex((cat) => cat.id == category.id && cat.name == category.name);

      this.breadCrumbsCats.splice(actualIndex + 1);

    }else{
      this.breadCrumbsCats.push(category);
    }

  }

  public canAddNew() : boolean {
    return this.modelService.canAddNew();
  }

}
