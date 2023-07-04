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
import {CategoryService} from "../../../Service/Shared/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../Service/Shared/alert.service";
import {UiMessage} from "../../../Model/Shared/ui-message";
import {messageType} from "../../../Constant/messageType";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent<T extends Category<T>, C> implements OnInit {

  @Input() model : T;

  @Input() modelService : ModelService<T>;

  @Input() contentModel : C;

  @Input() contentModelService : ModelService<C>;

  public contentFilter : FilterRequest[] = [];

  public categoryHasContent : boolean = false;

  public actualCategory : Category<T> | null = null;

  public categoryLoaded : boolean = false;

  public categories : Category<T>[] = [];

  private pageRequest : PageRequest = new PageRequest();

  private user : User | null;

  private pageableResponse : PageableResponse<T> = new PageableResponse<T>();

  public breadCrumbsCats : {id : number, name : string}[] = [];

  public isLoading : boolean = true;

  public newCategoryForm : FormGroup<{categoryName : FormControl, categoryDescription : FormControl}> = new FormGroup({
      categoryName : new FormControl("", {validators: [Validators.required]}),
      categoryDescription : new FormControl("", {validators: [Validators.required]})
  });

  constructor(
    private loginService : LoginService,
    private errorHandler : ErrorHandlerService,
    private businessService : BusinessService,
    private categoryService : CategoryService,
    private alertService : AlertService
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
    this.isLoading = true;
    this.categories = [];

    let getCat = this.modelService.getPageListView<T>(this.pageRequest).subscribe({
      next : (response) => {
        this.pageableResponse = response;
        // @ts-ignore
        this.categories = response.content;
        this.isLoading = false;
      },
      complete : () => {
        getCat.unsubscribe();
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

    let getCat = this.modelService.getOne<T>(id).subscribe({
      next : (response : T) => {
        this.actualCategory = this.modelService.createInstance(response);
        this.getActualCategoryContent();
        this.getSubCategories();
        // @ts-ignore
        this.checkBreadCrumbs({id : this.actualCategory.id, name: this.actualCategory.name});
        this.categoryService.loadParentCategory(response.id);
      },
      complete : () => {
        getCat.unsubscribe();
      }
    })
  }

  public viewCategory(id : number | null){
    if (id){
      this.setActualCategory(id);
    }
    this.clearNewCategoryForm();
  }

  public createNewCategory() : void {

    let newCategory : Category<T> = new Category();

    if (this.newCategoryForm.valid){
      newCategory.name = this.newCategoryForm.value.categoryName;
      newCategory.description = this.newCategoryForm.value.categoryDescription;
    }

    if (this.actualCategory)
      newCategory.parentCategory = this.actualCategory.id;

    newCategory.business = this.businessService.getLoadedBusiness();

    let createNewCat = this.modelService.createNew(newCategory).subscribe({
      next : (response : Category<T>) => {
        this.getSubCategories();
        this.alertService.addNewAlert(
          new UiMessage(`Category: ${response.name} has been added`, messageType.SUCCESS)
        );
        this.clearNewCategoryForm();
      },
      error : err => {
        console.log("Error");
        console.log(err);
      },
      complete : () => {
        createNewCat.unsubscribe();
      }
    });

  }

  public deleteCategory(id : number | null) {
    if (id){
      let delCat = this.modelService.deleteOne(id).subscribe({
        next : (response : Category<T>) =>{
          this.getSubCategories();
          this.alertService.addNewAlert(
            new UiMessage( "Category: " + response.name + " has been deleted! ", messageType.ERROR)
          )
        },
        error : err => {
          console.log(err);
        },
        complete : () => {
          delCat.unsubscribe();
        }
      });
    }
  }

  public clearNewCategoryForm() : void {
    this.newCategoryForm.setValue({categoryName : "", categoryDescription : ""});
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

    }else{
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

}
