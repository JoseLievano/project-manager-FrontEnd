import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {BsTypeService} from "../../../../../Service/Business/bs-type.service";
import {bsType} from "../../../../../Model/Business/bsType";
import {Subscription} from "rxjs";
import {PageRequest} from "../../../../../Model/Shared/pageRequest";
import {FilterRequest} from "../../../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../../../Model/Shared/operationRequest";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {bsPrTask} from "../../../../../Model/Project/bsPrTask";
import {bsTaskCategory} from "../../../../../Model/Business/bsTaskCategory";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";

@Component({
  selector: 'app-bs-type-list',
  templateUrl: './bs-type-list.component.html',
  styleUrls: ['./bs-type-list.component.css']
})
export class BsTypeListComponent implements OnInit, OnDestroy{

  public bsTypes : bsType[] = [];

  private modelChangedSubscription : Subscription;

  private pageRequest : PageRequest = new PageRequest();

  public isLoading : boolean = true;

  constructor(
    private businessService : BusinessService,
    private bsTypeService : BsTypeService,
    private alertService : AlertService,
    private errorService : ErrorHandlerService
  ) {
    this.modelChangedSubscription = this.bsTypeService.modelsChanged.subscribe({
      next : () => {
        this.getBsTypes();
      }
    });
  }

  ngOnInit(): void {
    this.setInitialPageReqState();
    this.getBsTypes();
  }

  private setInitialPageReqState(){
    this.pageRequest.page = 0;
    this.pageRequest.size = 5;

    //Creates a filter request
    const filterReq : FilterRequest = new FilterRequest();
    filterReq.field = "business";
    filterReq.operations = [new OperationRequest()]
    filterReq.operations[0].value = this.businessService.getLoadedBusiness().toString();
    filterReq.operations[0].operator = "=";
    filterReq.operations[0].field = "id";
    this.pageRequest.filter = [filterReq];
  }

  private getBsTypes() {
    this.isLoading = true;

    let getTypesPageView = this.bsTypeService.getPageView<bsType>(this.pageRequest).subscribe({
      next : (response) => {
        if (response.content)
          this.bsTypes = response.content;

        this.isLoading = false;
      },
      error : err => {
        this.errorService.processError(err);
      },
      complete : () => {
        getTypesPageView.unsubscribe();
      }
    })

  }

  public processTasks(tasks : bsPrTask[] | number | null) : number{

    if (tasks){
      if (typeof tasks == "number"){
        return tasks;
      }else {
        return tasks.length;
      }
    }
    return 0;
  }

  public processTaskCategories(taskCat : bsTaskCategory[] | number[] | number | null) : bsTaskCategory[]{
    let taskCatList : bsTaskCategory[] = [];

    if (Array.isArray(taskCat)){
      taskCat.forEach(actualTask => {
        if (typeof actualTask != "number")
          taskCatList.push(actualTask);
      })
    }

    return taskCatList;
  }

  public disableDeleteButton(type : bsType) : boolean{

    //Check tasks
    const tasks = type.tasks;
    if (tasks){
      if (typeof tasks == "number" && tasks > 0)
        return false;
      if (Array.isArray(tasks) && tasks.length > 0)
        return false;
    }

    return false;
  }

  public deleteType(type : bsType){
    if (type.id){
      let deleteSub = this.bsTypeService.deleteOne(type.id).subscribe({
        next : (response) => {
          this.alertService.addNewAlert(
            new UiMessage("Type " + response.name + " has been deleted", messageType.SUCCESS)
          );
          this.getBsTypes();
        },
        error : err => {
          this.errorService.processError(err);
        },
        complete : () => {
          deleteSub.unsubscribe();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.modelChangedSubscription.unsubscribe();
  }
}
