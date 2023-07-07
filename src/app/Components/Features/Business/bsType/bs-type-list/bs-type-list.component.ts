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

      }
    });
  }

  ngOnInit(): void {
    this.setInitialPageReqState();
    this.getBsTypes();
  }

  ngOnDestroy(): void {
    this.modelChangedSubscription.unsubscribe();
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

  public processTaskCategories(taskCat : bsTaskCategory[] | number | null) : bsTaskCategory[]{
    if (taskCat == null || typeof taskCat == "number")
      return []

    else return taskCat;
  }

}
