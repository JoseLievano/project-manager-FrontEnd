import { Component } from '@angular/core';
import {BsTaskCategoryService} from "../../../../../Service/Business/bs-task-category.service";
import {BusinessService} from "../../../../../Service/Business/business.service";
import {bsTaskCategory} from "../../../../../Model/Business/bsTaskCategory";
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {ActionModelEmit} from "../../../../../Model/Shared/actionModelEmit";
import {actionType} from "../../../../../Constant/actionType";

@Component({
  selector: 'app-add-new-bs-task-category',
  templateUrl: './add-new-bs-task-category.component.html',
  styleUrls: ['./add-new-bs-task-category.component.css']
})
export class AddNewBsTaskCategoryComponent {

  private taskCategory : bsTaskCategory = new bsTaskCategory();

  /*public newTaskCategoryForm : FormGroup = new FormGroup<any>({
    name : new FormControl('', {validators : [Validators.required]})
  })*/

  public newTaskCategoryForm = this.formBuilder.group({
    name : [null]
  })

  constructor(
    private bsTaskCategoryService : BsTaskCategoryService,
    private businessService : BusinessService,
    private alertService : AlertService,
    private errorService : ErrorHandlerService,
    private formBuilder : FormBuilder
  ) {
    this.taskCategory.business = this.businessService.getLoadedBusiness();
  }

  public nameValueIsEmpty() {
    /*let name = this.newTaskCategoryForm.value.name;
    return name != null && true && name != "";*/
    return true;
  }

  public addNewTaskCategory(){

    /*this.taskCategory.name = this.newTaskCategoryForm.value.name;*/
    /*this.newTaskCategoryForm.controls.name.setValue("");*/

    let taskCatSubsCription = this.bsTaskCategoryService.createNew<bsTaskCategory>(this.taskCategory).subscribe({
      next : (response) => {
        if (response.id){
          const emitModel : ActionModelEmit<bsTaskCategory> = new ActionModelEmit<bsTaskCategory>(actionType.NEW, response);
          this.bsTaskCategoryService.modelsChanged.emit(emitModel);
        }
        this.alertService.addNewAlert(
          new UiMessage("New task category " + response.name + " added", messageType.SUCCESS)
        )
      },
      error : err => {
        this.errorService.processError(err);
      },
      complete : () =>{
        taskCatSubsCription.unsubscribe();
      }
    })
  }

  getFormData() {
    console.log(this.newTaskCategoryForm);
    console.log("Data name", this.newTaskCategoryForm.controls.name.value);
    console.log("Form validity", this.newTaskCategoryForm.valid);
  }

}
