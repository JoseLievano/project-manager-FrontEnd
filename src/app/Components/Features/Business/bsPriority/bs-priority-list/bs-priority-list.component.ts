import {Component, OnDestroy, OnInit} from '@angular/core';
import {bsPriority} from "../../../../../Model/Business/bsPriority";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {PageRequest} from "../../../../../Model/Shared/pageRequest";
import {BusinessService} from "../../../../../Service/Business/business.service";
import {BsPriorityService} from "../../../../../Service/Business/bs-priority.service";
import {SortRequest} from "../../../../../Model/Shared/sortRequest";
import {Subscription} from "rxjs";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {messageType} from "../../../../../Constant/messageType";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bs-priority-list',
  templateUrl: './bs-priority-list.component.html',
  styleUrls: ['./bs-priority-list.component.css']
})
export class BsPriorityListComponent implements OnInit, OnDestroy{

  public priorities : bsPriority[] = []

  private pageRequest : PageRequest = new PageRequest();

  private listChangedSub : Subscription;

  private readonly actualBusiness : number;

  private orderHasBeenModified : boolean = false;

  public faEllipsisVertical = faEllipsisVertical;

  constructor(
    private businessService : BusinessService,
    private bsPriorityService : BsPriorityService,
    private alertService : AlertService,
    private errorService : ErrorHandlerService
  ) {
    this.actualBusiness = this.businessService.getLoadedBusiness();
  }

  ngOnInit(): void {
    this.listChangedSub = this.bsPriorityService.modelsChanged.subscribe({
      next : (response : any) => {
        this.getPriorities()
      },
      error : (err : any) =>{
        this.alertService.addNewAlert(
          new UiMessage(err.toString(), messageType.ERROR)
        )
      }
    })
    this.setInitialPageReqState();
    this.getPriorities();
  }

  private setInitialPageReqState(){
    this.pageRequest.page = 0;
    this.pageRequest.size = 15;

    //Filter Request to get all items related to the current loaded business
    this.pageRequest.filter = [this.businessService.filterReqWithLoadedBusiness()];

    //Sort by PriorityOrder
    let prioritySort : SortRequest = new SortRequest();
    prioritySort.property = "priorityOrder";
    prioritySort.isAscending = true;

    this.pageRequest.sort = [prioritySort];

  }

  private getPriorities(){

    this.priorities = [];

    let prioritiesReq = this.bsPriorityService.getPageListView<bsPriority>(this.pageRequest).subscribe({
      next : (response) => {
        if (response.content){
          this.priorities = response.content;
        }
      },
      error : err => {
        this.errorService.processError(err);
      },
      complete : () => {
        prioritiesReq.unsubscribe();
      }
    })

  }

  public drop(event: CdkDragDrop<bsPriority[]>) {
    moveItemInArray(this.priorities, event.previousIndex, event.currentIndex);
    console.log("prev: " + event.previousIndex + " current: " + event.currentIndex);
    this.changePriorityOrder();
  }

  private changePriorityOrder(){
    let priorityIndex : number = 1;
    this.priorities.forEach(priority => {
      priority.business = this.actualBusiness;
      priority.priorityOrder = priorityIndex;
      priorityIndex++;
    });
    this.sendOrderModificationReq();
    this.orderHasBeenModified = true;
  }

  public saveOrder(){
    this.sendOrderModificationReq();
    /*if (this.orderHasBeenModified){
      this.sendOrderModificationReq();
      this.orderHasBeenModified = false;
    }*/
  }

  private sendOrderModificationReq(){
    let orderUpdateSub = this.bsPriorityService.updateOrder(this.priorities).subscribe({
      next : (response) => {
        /*console.log("Order has been modified: ", response);*/
      },
      error : err => {
        this.errorService.processError(err);
      },
      complete : () => {
        orderUpdateSub.unsubscribe();
      }
    })
  }

  public deletePriority(priority : bsPriority){

    if (priority.id){
      let deletePrioritySubs = this.bsPriorityService.deleteOne(priority.id).subscribe({
        next : (response) => {
          if (response.name){
            this.alertService.addNewAlert(
              new UiMessage("Priority " + response.name + " has been deleted", messageType.SUCCESS)
            )
            this.getPriorities();
          }
        },
        error : err => {
          this.errorService.processError(err);
        },
        complete : () => {
          deletePrioritySubs.unsubscribe();
        }
      })
    }

  }

  ngOnDestroy(): void {
    this.listChangedSub.unsubscribe();
  }

}
