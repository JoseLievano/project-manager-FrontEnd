import {Component, OnInit} from '@angular/core';
import {BsStatusService} from "../../../../../Service/Business/bs-status.service";
import {bsStatus} from "../../../../../Model/Business/bsStatus";
import {PageRequest} from "../../../../../Model/Shared/pageRequest";
import {PageableResponse} from "../../../../../Model/Shared/PageableResponse";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";
import {FilterRequest} from "../../../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../../../Model/Shared/operationRequest";
import {BusinessService} from "../../../../../Service/Business/business.service";
@Component({
  selector: 'app-bs-status-list',
  templateUrl: './bs-status-list.component.html',
  styleUrls: ['./bs-status-list.component.css']
})
export class BsStatusListComponent implements OnInit{

  public isLoading : boolean = true;

  private pageRequest : PageRequest = new PageRequest();

  public statuses : bsStatus[] = [];

  public constructor(
    private bsStatusService : BsStatusService,
    private errorService : ErrorHandlerService,
    private alertService : AlertService,
    private businessService : BusinessService
  ) {}

  ngOnInit(): void {
    this.setInitialPageReqState();
    this.getStatuses();
  }

  public getStatuses(){
    this.isLoading = true;
    this.bsStatusService.getPageListView<bsStatus>(this.pageRequest).subscribe({
      next : (response : PageableResponse<bsStatus>) =>{
        if (response.content)
          this.statuses = response.content;
        console.log("Get Status ", response);
        this.isLoading = false;
      },
      error : err => {
        this.errorService.processError(err);
      }
    });
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

  public getColor(status : bsStatus) : string {
    return "color : " + status.color;
  }

  public deleteStatusItem(id : number | null) {
    if (id && id > 0){
      this.bsStatusService.deleteOne(id).subscribe({
        next : (response : bsStatus ) =>{
          const statusName = response.name;
          this.getStatuses();
          this.alertService.addNewAlert(new UiMessage("The status : " + statusName + " has been deleted!", messageType.SUCCESS));
        },
        error : err => {
          if (err.error){
            this.errorService.processError(err.error);
          }else {
            this.errorService.processError(err);
          }
        }
      });
    }else{
      this.alertService.addNewAlert(
        new UiMessage("We can't delete the status!", messageType.ERROR)
      );
    }

  }

  public addNewStatus(status : bsStatus){
    if (status.business && status.name && status.color){
      this.bsStatusService.createNew(status).subscribe({
        next : (response) =>{
          this.getStatuses();
          this.alertService.addNewAlert(
            new UiMessage("Status " + response.name + " has been added!", messageType.SUCCESS)
          );
        },
        error : err => {
          this.errorService.processError(err);
        }
      });
    }else{
      this.alertService.addNewAlert(
        new UiMessage("The status information is not complete :(", messageType.ERROR)
      )
    }
  }

  public updateStatus(toUpdate : bsStatus){
    console.log("Ha actualizar: ", toUpdate);
    toUpdate.tasks = null;
    if (toUpdate.id){
      this.bsStatusService.updateOne(toUpdate.id, toUpdate).subscribe({
        next : (response) => {
          console.log("Updated response ",response);
          this.alertService.addNewAlert(
            new UiMessage(response.name + " has been updated!", messageType.SUCCESS)
          );
          this.getStatuses();
        },
        error : err => {
          console.log(err);
          this.errorService.processError(err);
        }
      });
    }else{
      this.alertService.addNewAlert(
        new UiMessage()
      );
    }
  }

  public canAddNew() : boolean {
    return this.bsStatusService.canAddNew();
  }

}
