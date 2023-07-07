import { Component } from '@angular/core';
import {BsTaskCategoryService} from "../../../../../Service/Business/bs-task-category.service";
import {BusinessService} from "../../../../../Service/Business/business.service";
import {bsTaskCategory} from "../../../../../Model/Business/bsTaskCategory";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";

@Component({
  selector: 'app-add-new-bs-task-category',
  templateUrl: './add-new-bs-task-category.component.html',
  styleUrls: ['./add-new-bs-task-category.component.css']
})
export class AddNewBsTaskCategoryComponent {

  private taskCategory : bsTaskCategory = new bsTaskCategory();

  public newTaskCategoryForm : FormGroup = new FormGroup<any>({
    name : new FormControl('', {validators : [Validators.required]})
  })

  constructor(
    private bsTaskCategoryService : BsTaskCategoryService,
    private businessService : BusinessService,
    private alertService : AlertService,
    private errorService : ErrorHandlerService
  ) {
    this.taskCategory.business = this.businessService.getLoadedBusiness();
  }

  public nameValueIsEmpty() {
    let name = this.newTaskCategoryForm.value.name;

    return name != null && true && name != "";
  }

  public addNewTaskCategory(){

    this.taskCategory.name = this.newTaskCategoryForm.value.name;
    this.newTaskCategoryForm.controls['name'].setValue("");

    let taskCatSubsCription = this.bsTaskCategoryService.createNew<bsTaskCategory>(this.taskCategory).subscribe({
      next : (response) => {
        if (response.id)
          this.bsTaskCategoryService.modelsChanged.emit(response.id);
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

}
