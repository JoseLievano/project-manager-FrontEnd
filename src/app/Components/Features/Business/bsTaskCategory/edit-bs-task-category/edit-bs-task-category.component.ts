import {Component, Input, OnInit} from '@angular/core';
import {bsTaskCategory} from "../../../../../Model/Business/bsTaskCategory";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BsTaskCategoryService} from "../../../../../Service/Business/bs-task-category.service";
import {BusinessService} from "../../../../../Service/Business/business.service";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {ActionModelEmit} from "../../../../../Model/Shared/actionModelEmit";
import {actionType} from "../../../../../Constant/actionType";

@Component({
  selector: 'app-edit-bs-task-category',
  templateUrl: './edit-bs-task-category.component.html',
  styleUrls: ['./edit-bs-task-category.component.css']
})
export class EditBsTaskCategoryComponent implements OnInit{

  @Input() toEdit : bsTaskCategory;

  public modalID : string;

  public editForm : FormGroup = new FormGroup<any>({
    name : new FormControl("", {validators : [Validators.required]})
  })

  constructor(
    private bsTaskCategoryService : BsTaskCategoryService,
    private businessService : BusinessService,
    private alertService : AlertService,
    private errorService : ErrorHandlerService
  ) {
  }

  ngOnInit(): void {

    this.modalID = "edit-task-cat-modal-" + this.toEdit.id;

    if (this.toEdit.name){
      this.editForm.controls['name'].setValue(this.toEdit.name);
    }
  }

  public showEditModal(){
    const modal : any = document.getElementById(this.modalID);
    modal.showModal();
  }

  public updateTaskCategory(){

    console.log("form value", this.editForm.value.name);

    const newName = this.editForm.value.name;

    if (newName != "" && newName != null && !this.editForm.pristine){
      let newTaskCat : bsTaskCategory = new bsTaskCategory();
      newTaskCat.name = newName;
      newTaskCat.id = this.toEdit.id;
      newTaskCat.business = this.businessService.getLoadedBusiness();
      this.sendUpdateRequest(newTaskCat);
    }else{
      this.alertService.addNewAlert(
        new UiMessage("Invalid new name", messageType.ERROR)
      )
    }
  }

  private sendUpdateRequest(newTaskCat : bsTaskCategory){
    if (newTaskCat.id){
      let updateReq = this.bsTaskCategoryService.updateOne(newTaskCat.id, newTaskCat).subscribe({
        next : (response) => {
          const emitModel : ActionModelEmit<bsTaskCategory> = new ActionModelEmit<bsTaskCategory>(actionType.EDIT, response);
          this.bsTaskCategoryService.modelsChanged.emit(emitModel);
          this.alertService.addNewAlert(
            new UiMessage("New Task Category " + response.name + " has been added", messageType.SUCCESS)
          )
        },
        error : err => {
          this.errorService.processError(err);
        },
        complete : () =>{
          updateReq.unsubscribe();
        }
      })
    }
  }
}
