import {Component, Input, OnInit} from '@angular/core';
import {bsPriority} from "../../../../../Model/Business/bsPriority";
import {BsPriorityService} from "../../../../../Service/Business/bs-priority.service";
import {BusinessService} from "../../../../../Service/Business/business.service";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";
import {ActionModelEmit} from "../../../../../Model/Shared/actionModelEmit";
import {actionType} from "../../../../../Constant/actionType";

@Component({
  selector: 'app-edit-bs-priority',
  templateUrl: './edit-bs-priority.component.html',
  styleUrls: ['./edit-bs-priority.component.css']
})
export class EditBsPriorityComponent implements OnInit{

  @Input() toEdit : bsPriority;

  public modalID : string;

  public editForm : FormGroup = new FormGroup<any>({
    name : new FormControl("", {validators: [Validators.required, Validators.min(3)]})
  })

  public dialogModal : HTMLDialogElement;

  constructor(
    private bsPriorityService : BsPriorityService,
    private businessService : BusinessService,
    private alertService : AlertService,
    private errorService : ErrorHandlerService
  ) {
  }

  ngOnInit(): void {
    this.modalID = `edit-priority-${this.toEdit.id}-${this.toEdit.name}`
    this.toEdit.business = this.businessService.getLoadedBusiness();
    this.editForm.controls["name"].setValue(this.toEdit.name);
  }

  public showEditModal(){
    if (this.dialogModal){
      this.dialogModal.showModal()
    }else {
      this.dialogModal = document.getElementById(this.modalID) as HTMLDialogElement;
      this.dialogModal.showModal();
    }
    console.log(this.dialogModal);
  }

  public validName() : boolean{
    let isValid = false;
    let actualValue = this.editForm.value.name;
    isValid = actualValue != this.toEdit.name &&
              actualValue.length >= 3 &&
              !/^\s*$/.test(actualValue) &&
              (actualValue.charAt(0) != " ");
    return isValid;
  }

  public updatePriority(){
    if (this.validName() && typeof this.toEdit.id == "number"){
      let updatedPriority : bsPriority = new bsPriority();
      updatedPriority.id = this.toEdit.id;
      updatedPriority.name = this.editForm.value.name;

      let updateRequest = this.bsPriorityService.updateOne(updatedPriority.id, updatedPriority).subscribe({
        next : (response) => {
          const modelChange : ActionModelEmit<bsPriority> = new ActionModelEmit<bsPriority>(actionType.EDIT, response);
          this.bsPriorityService.modelsChanged.emit(modelChange);
          this.alertService.addNewAlert(
            new UiMessage(response.name + " priority has been changed", messageType.SUCCESS)
          )
        },
        error : err => {
          this.errorService.processError(err);
        },
        complete : () =>{
          updateRequest.unsubscribe();
        }
      })


    }else {
      this.alertService.addNewAlert(
        new UiMessage("Invalid priority name", messageType.ERROR)
      )
    }
  }
}
