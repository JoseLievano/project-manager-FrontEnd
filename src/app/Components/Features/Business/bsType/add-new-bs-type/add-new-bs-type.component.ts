import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {BsTypeService} from "../../../../../Service/Business/bs-type.service";
import {BsTaskCategoryService} from "../../../../../Service/Business/bs-task-category.service";
import {bsType} from "../../../../../Model/Business/bsType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PageRequest} from "../../../../../Model/Shared/pageRequest";
import {bsTaskCategory} from "../../../../../Model/Business/bsTaskCategory";
import {FilterRequest} from "../../../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../../../Model/Shared/operationRequest";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {Subscription} from "rxjs";
import {SortRequest} from "../../../../../Model/Shared/sortRequest";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";

@Component({
  selector: 'app-add-new-bs-type',
  templateUrl: './add-new-bs-type.component.html',
  styleUrls: ['./add-new-bs-type.component.css']
})
export class AddNewBsTypeComponent implements OnInit, OnDestroy{

  private bsType : bsType = new bsType();

  private taskCatsPageRequest : PageRequest = new PageRequest(0, 10);

  private taskCatsFilterReq : FilterRequest = new FilterRequest();

  public bsTaskCats : bsTaskCategory[] = [];

  public newTypeForm : FormGroup = new FormGroup<any>({
    name : new FormControl("", {validators : Validators.required}),
    taskCat : new FormControl("", {validators : Validators.min(2)})
  })

  private formSubscription : Subscription;

  constructor(
    private businessService : BusinessService,
    private bsTypeService : BsTypeService,
    private bsTaskCategoryService : BsTaskCategoryService,
    private errorService : ErrorHandlerService,
    private alertService : AlertService
  ) {
    this.bsType.name = "";
    this.bsType.taskCategories = [];
  }

  ngOnInit(): void {

    const sort = new SortRequest("name", true);
    this.taskCatsPageRequest.sort = [sort];

    this.bsType.business = this.businessService.getLoadedBusiness();

    this.formSubscription = this.newTypeForm.valueChanges.subscribe({
      next : (response : {name : string, taskCat : string}) => {
        this.verifyTaskCatName(response.taskCat);
      }
    })
  }

  private verifyTaskCatName(name : string){
    if (name.length >= 3){
      this.getTaskCatList(name);
    }else{
      this.bsTaskCats = [];
    }
  }

  private getTaskCatList(searchVal : string){

    this.taskCatsFilterReq.field = "name";

    this.taskCatsFilterReq.operations = [new OperationRequest(":", searchVal, "name")]

    this.taskCatsPageRequest.filter = [this.taskCatsFilterReq];

    let getTask = this.bsTaskCategoryService.getPageListView<bsTaskCategory>(this.taskCatsPageRequest).subscribe({
      next : (response) => {
        const content = response.content;
        if (content)
          this.bsTaskCats = content;

      },
      error : err => {
        console.log(err);
        this.errorService.processError(err);
      },
      complete : () => {
        getTask.unsubscribe();
      }
    });
  }

  public addNewType(){

    if (this.isValidNewType()){

      this.transformTaskCatToNum();

      console.log(this.bsType);

      let addNewType = this.bsTypeService.createNew(this.bsType).subscribe({
        next : (response) => {
          if (response.id){
            this.bsTypeService.modelsChanged.emit(response.id);
            this.alertService.addNewAlert(
              new UiMessage("New Type " + response.name + " has been added", messageType.SUCCESS)
            );
            console.log("added: ", response);
          }
        },
        error : (err) => {
          this.errorService.processError(err);
        },
        complete : () => {
          addNewType.unsubscribe();
        }
      })
    }else{
      this.alertService.addNewAlert(
        new UiMessage("Can't add the new type " + this.bsType.name, messageType.ERROR)
      );
    }
  }

  private transformTaskCatToNum(){
    let numTaskCats : number[] = [];
    if (Array.isArray(this.bsType.taskCategories)){
      this.bsType.taskCategories.forEach(actualTaskCat => {
        if (typeof actualTaskCat == "number"){
          numTaskCats.push(actualTaskCat);
        }else{
          if (actualTaskCat.id)
            numTaskCats.push(actualTaskCat.id)
        }
      })
    }
    this.bsType.taskCategories = numTaskCats;
    console.log(this.bsType.taskCategories);
  }

  public isValidNewType() : boolean{
    this.bsType.name = this.newTypeForm.controls["name"].value.toString();
    return !!(this.bsType.name && this.bsType.name != "" && this.amountOfTaskCat() > 0);
  }

  public addTaskCatToTypeModel(taskCat : bsTaskCategory){
    if (typeof this.bsType.taskCategories != "number" && this.bsType.taskCategories){
      // @ts-ignore
      this.bsType.taskCategories.push(taskCat);
    }

    this.bsTaskCats = [];
    this.newTypeForm.controls["taskCat"].setValue("");
  }

  private amountOfTaskCat() : number{
    if (this.bsType.taskCategories){
      if (typeof this.bsType.taskCategories == "number"){
        return 0;
      }else {
        return this.bsType.taskCategories.length;
      }
    }
    return 0
  }

  public showSearchTaskCat() : boolean{
    return this.bsTaskCats.length > 0;
  }

  public getAddedTask() : bsTaskCategory[]{
    if (this.bsType.taskCategories){

      if (Array.isArray(this.bsType.taskCategories)){

        let taskCats : bsTaskCategory[] = [];

        this.bsType.taskCategories.forEach(actualTaskCat => {
          if (typeof actualTaskCat != "number")
            taskCats.push(actualTaskCat);
        })

        return taskCats;

      }
    }
    return [];
  }

  public deleteTaskCatFromType(taskCat : bsTaskCategory){

    if (Array.isArray(this.bsType.taskCategories)){
      let taskCats : bsTaskCategory[] = [];
      this.bsType.taskCategories.forEach(actualTask => {
        if (typeof actualTask != "number")
          taskCats.push(actualTask);
      })
      const toDelIndex = taskCats.findIndex((actualTaskCat) => actualTaskCat.id === taskCat.id );
      this.bsType.taskCategories.splice(toDelIndex, 1);

    }

  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

}
