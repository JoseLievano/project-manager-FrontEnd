import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-bs-task-category-list',
  templateUrl: './bs-task-category-list.component.html',
  styleUrls: ['./bs-task-category-list.component.css']
})
export class BsTaskCategoryListComponent implements OnInit{

  public taskCategories : bsTaskCategory[] = [];

  private pageRequest : PageRequest = new PageRequest();

  public isLoading : boolean = true;

  constructor(
    private bsTaskCategoryService : BsTaskCategoryService,
    private errorService : ErrorHandlerService,
    private alertService : AlertService,
    private businessService : BusinessService
  ) {
      bsTaskCategoryService.modelsChanged.subscribe({
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
    this.pageRequest.size = 50;

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
    console.log(this.pageRequest);
    this.isLoading = true;
    let x = this.bsTaskCategoryService.getPageListView<bsTaskCategory>(this.pageRequest).subscribe({
      next : (response) => {
        if (response.content){
          this.taskCategories = response.content;
        }
        this.isLoading = false;
      },
      error : err => {
        this.errorService.processError(err);
      },
      complete : () => {
        x.unsubscribe();
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
      )
    }
  }

}
