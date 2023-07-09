import {Component, OnDestroy, OnInit} from '@angular/core';
import {bsTaskCategory} from "../../../../../Model/Business/bsTaskCategory";
import {PageRequest} from "../../../../../Model/Shared/pageRequest";
import {BsTaskCategoryService} from "../../../../../Service/Business/bs-task-category.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";
import {FilterRequest} from "../../../../../Model/Shared/filterRequest";
import {BusinessService} from "../../../../../Service/Business/business.service";
import {OperationRequest} from "../../../../../Model/Shared/operationRequest";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bs-task-category-list',
  templateUrl: './bs-task-category-list.component.html',
  styleUrls: ['./bs-task-category-list.component.css']
})
export class BsTaskCategoryListComponent implements OnInit, OnDestroy{

  public taskCategories : bsTaskCategory[] = [];

  private pageRequest : PageRequest = new PageRequest();

  public isLoading : boolean = true;

  private changeSubscription : Subscription;

  constructor(
    private bsTaskCategoryService : BsTaskCategoryService,
    private errorService : ErrorHandlerService,
    private alertService : AlertService,
    private businessService : BusinessService
  ) {
      this.changeSubscription = bsTaskCategoryService.modelsChanged.subscribe({
        next : () => {
          this.getTaskCategories();
        }
      });

  }

  ngOnInit(): void {
    this.setInitialPageReqState();
    this.getTaskCategories();
  }

  private setInitialPageReqState(){
    this.pageRequest.page = 0;
    this.pageRequest.size = 10;

    //Creates a filter request
    const filterReq : FilterRequest = new FilterRequest();
    filterReq.field = "business";
    filterReq.operations = [new OperationRequest()]
    filterReq.operations[0].value = this.businessService.getLoadedBusiness().toString();
    filterReq.operations[0].operator = "=";
    filterReq.operations[0].field = "id";
    this.pageRequest.filter = [filterReq];
  }

  private getTaskCategories(){
    this.isLoading = true;
    let addNewTaskCat = this.bsTaskCategoryService.getPageListView<bsTaskCategory>(this.pageRequest).subscribe({
      next : (response) => {
        if (response.content){
          this.taskCategories = response.content;
        }
        this.isLoading = false;
        console.log("task cats", this.taskCategories);
      },
      error : err => {
        this.errorService.processError(err);
      },
      complete : () => {
        addNewTaskCat.unsubscribe();
      }
    });

  }

  public deleteTaskCategory(taskCategory : bsTaskCategory){
    if (taskCategory.id){
      this.bsTaskCategoryService.deleteOne(taskCategory.id).subscribe({
        next : (response) => {
          this.getTaskCategories();
          this.alertService.addNewAlert(
            new UiMessage("Task category " + response.name + " has been deleted", messageType.SUCCESS)
          )
        },
        error : err => {
          this.errorService.processError(err);
        }
      })
    }else {
      this.alertService.addNewAlert(
        new UiMessage("Can't delete this task category")
      );
    }
  }

  public disableDeleteButton (taskCat : bsTaskCategory) : boolean{

    //Check tasks
    const tasks = taskCat.tasks;
    if (tasks){
      if (typeof tasks == "number" && tasks > 0)
        return true;
      if (Array.isArray(tasks) && tasks.length > 0)
        return true;
    }

    //Check types
    const types = taskCat.types;
    if (types){
      if (typeof types == "number" && types > 0)
        return true;
      if (Array.isArray(types) && types.length > 0)
        return true;
    }

    return false;
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }

}
