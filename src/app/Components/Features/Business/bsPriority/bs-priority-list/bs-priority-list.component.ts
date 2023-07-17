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
import { faEllipsisVertical, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {ActionModelEmit} from "../../../../../Model/Shared/actionModelEmit";
import {actionType} from "../../../../../Constant/actionType";

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

  public faGripVertical : IconDefinition = faGripVertical;

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
      next : (response : ActionModelEmit<bsPriority>) => {
        let action = response.getAction();
        let bsPriority : bsPriority = response.getModel();
        switch (action){
          case actionType.NEW :
            this.addNewPriority(bsPriority);
            break;
          case actionType.EDIT :
            this.editModel(bsPriority)
            break;
          default :
            this.alertService.addNewAlert(new UiMessage("Can't get a valid priority", messageType.ERROR));
            break;
        }
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
    let changedPriorities = [];
    for (let i = event.previousIndex; i <= event.currentIndex; i++){
      changedPriorities.push(this.priorities[i])
    }
    this.sendOrderModificationReq(this.changedPriorities(event.previousIndex, event.currentIndex))
  }

  private changedPriorities(previousIndex : number, currentIndex : number) : bsPriority[]{

    let changedPriorities : bsPriority[] = [];

    if (previousIndex < currentIndex){
      for (let i = previousIndex; i <= currentIndex; i++){
        this.priorities[i].priorityOrder = i+1;
        let newPriority : bsPriority = new bsPriority();
        newPriority.name = this.priorities[i].name;
        newPriority.id = this.priorities[i].id;
        newPriority.business = this.actualBusiness;
        newPriority.priorityOrder = this.priorities[i].priorityOrder;
        changedPriorities.push(newPriority);
      }
    }else{
      for (let i = currentIndex; i <= previousIndex; i++){
        this.priorities[i].priorityOrder = i+1;
        let newPriority : bsPriority = new bsPriority();
        newPriority.id = this.priorities[i].id;
        newPriority.name = this.priorities[i].name;
        newPriority.business = this.actualBusiness;
        newPriority.priorityOrder = this.priorities[i].priorityOrder;
        changedPriorities.push(newPriority);
      }
    }

    console.log(changedPriorities);

    return changedPriorities;

  }

  private sendOrderModificationReq(changedPriorities : bsPriority[]){
    let orderUpdateSub = this.bsPriorityService.updateOrder(changedPriorities).subscribe({
      next : (response) => {
        console.log("Order has been modified: ", response);
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
          if (response.name && response.id){
            this.deleteBox(response);
            this.alertService.addNewAlert(
              new UiMessage("Priority " + response.name + " has been deleted", messageType.SUCCESS)
            )
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

  private deleteBox(deletedPriority : bsPriority){
    if (deletedPriority.id && deletedPriority.name){
      let deletedIndex : number = this.priorities.findIndex(priority => priority.id === deletedPriority.id);
      this.priorities.splice(deletedIndex, 1);
      this.updatePriorityOrderAfterDeletion(deletedIndex);
    }
  }

  private updatePriorityOrderAfterDeletion(deletedIndex : number){
    const actualSize : number = this.priorities.length;
    for (let i = deletedIndex; i < actualSize; i ++){
      // @ts-ignore
      let actualPriorityOrder : number = this.priorities[i].priorityOrder -1 ;
      this.priorities[i].priorityOrder = actualPriorityOrder;
    }
  }

  private addNewPriority(newPriority : bsPriority){
    newPriority.tasks = 0;
    this.priorities.push(newPriority);
  }

  private editModel(modifiedPriority : bsPriority){
    const toModifiedIndex = this.priorities.findIndex(priotiy => priotiy.id == modifiedPriority.id);
    this.priorities[toModifiedIndex].name = modifiedPriority.name;
  }

  ngOnDestroy(): void {
    this.listChangedSub.unsubscribe();
  }

}
