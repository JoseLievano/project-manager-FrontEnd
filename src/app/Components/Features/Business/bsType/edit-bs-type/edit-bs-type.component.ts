import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {bsType} from "../../../../../Model/Business/bsType";
import {BsTypeService} from "../../../../../Service/Business/bs-type.service";
import {BsTaskCategoryService} from "../../../../../Service/Business/bs-task-category.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {BusinessService} from "../../../../../Service/Business/business.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {bsTaskCategory} from "../../../../../Model/Business/bsTaskCategory";
import {PageRequest} from "../../../../../Model/Shared/pageRequest";
import {FilterRequest} from "../../../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../../../Model/Shared/operationRequest";
import {SortRequest} from "../../../../../Model/Shared/sortRequest";
import {Subscription} from "rxjs";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";
import {ActionModelEmit} from "../../../../../Model/Shared/actionModelEmit";
import {actionType} from "../../../../../Constant/actionType";

@Component({
  selector: 'app-edit-bs-type',
  templateUrl: './edit-bs-type.component.html',
  styleUrls: ['./edit-bs-type.component.css']
})
export class EditBsTypeComponent implements OnInit, OnDestroy{

  @Input() toEdit : bsType;

  public taskCats : bsTaskCategory[] = [];

  public modalID : string;

  public taskCatsFromAPI : bsTaskCategory[] = [];

  private taskCatsPageRequest : PageRequest = new PageRequest(0, 10);

  private taskCatsFilterReq : FilterRequest = new FilterRequest();

  private formSubscript : Subscription;

  public typeTaskInputId : string;

  public editTypeForm : FormGroup = new FormGroup<any>({
    name : new FormControl("", {validators : Validators.required}),
    taskCat : new FormControl("", {validators: Validators.required})
  })
  constructor(
    private businessService : BusinessService,
    private bsTypeService : BsTypeService,
    private bsTaskCategory : BsTaskCategoryService,
    private errorService : ErrorHandlerService,
    private alertService : AlertService
  ) {

  }

  ngOnInit(): void {

    this.toEdit.business = this.businessService.getLoadedBusiness();

    const sort : SortRequest = new SortRequest("name", true);
    this.taskCatsPageRequest.sort = [sort];

    this.modalID = "edit-type-" + this.toEdit.id;

    this.typeTaskInputId = "typeTask-" + this.toEdit.id + "-" + this.toEdit.name;

    this.formSubscript = this.editTypeForm.valueChanges.subscribe({
      next : (response: {name : string, taskCat : string}) => {
        this.verifyTaskCatName(response.taskCat);
      }
    });
  }

  private verifyTaskCatName(name : string){
    if (name.length >= 3){
      this.getTaskCatList(name)
    }else {
      this.taskCatsFromAPI = [];
    }
  }

  private getTaskCatList(searchVal : string){

    this.taskCatsFromAPI = [];

    this.taskCatsFilterReq.field = "name";

    this.taskCatsFilterReq.operations = [new OperationRequest(":", searchVal, "name")]

    this.taskCatsPageRequest.filter = [this.taskCatsFilterReq];

    let getTask = this.bsTaskCategory.getPageListView<bsTaskCategory>(this.taskCatsPageRequest).subscribe({
      next : (response) => {
        const taskCats = response.content;
        if (taskCats && taskCats.length > 0){
          taskCats.forEach(taskCat => {
            let indexCheck = this.taskCats.findIndex(TC => TC.id == taskCat.id);
            if (indexCheck == -1){
              this.taskCatsFromAPI.push(taskCat);
            }
          })
        }
      },
      error : err => {
        this.errorService.processError(err);
      },
      complete : () => {
        getTask.unsubscribe();
      }
    });
  }

  public showEditModal(){

    if (this.toEdit.name){
      this.editTypeForm.controls["name"].setValue(this.toEdit.name);
    }

    this.taskCats = [];

    if (this.toEdit.taskCategories && Array.isArray(this.toEdit.taskCategories)){
      this.toEdit.taskCategories.forEach(actualTaskCat =>{
        if (typeof actualTaskCat != "number")
          this.taskCats.push(actualTaskCat);
      })
    }

    const modal : any = document.getElementById(this.modalID);
    modal.showModal();
  }

  public deleteTaskCat(taskCat: bsTaskCategory) {
    const toDelIndex = this.taskCats.findIndex((actualTaskCat) => actualTaskCat.id === taskCat.id );
    this.taskCats.splice(toDelIndex, 1);
  }

  public addTaskCatToTypeModel(taskCat : bsTaskCategory){
    this.editTypeForm.controls["taskCat"].setValue("");
    this.taskCats.push(taskCat);
    this.moveCaretToTaskCatInput();
  }

  private moveCaretToTaskCatInput(){
    const taskCatsInput : HTMLInputElement = document.getElementById(this.typeTaskInputId) as HTMLInputElement;
    const actualValue : number = taskCatsInput.value.length;
    taskCatsInput.setSelectionRange(actualValue, actualValue);
    taskCatsInput.focus();
  }

  public showSearchTaskCat() : boolean {
    return this.taskCatsFromAPI.length > 0;
  }

  public hasBeenModified() : boolean{

    let hasBeenModified : boolean = false;

    //Check if name has been changed
    let originalName : string = "";
    if (this.toEdit.name){
      originalName = this.toEdit.name;
    }
    let newName = this.editTypeForm.value.name;
    if (originalName != newName)
      return true;


    //Check if task cats are the same
    let orgTaskCats : bsTaskCategory[] = [];
    if (Array.isArray(this.toEdit.taskCategories)){
      this.toEdit.taskCategories.forEach(taskCat => {
        if (typeof taskCat != "number"){
          orgTaskCats.push(taskCat);
        }
      });
    }else{
      hasBeenModified = false;
    }

    if (orgTaskCats.length == this.taskCats.length){
      this.taskCats.forEach(orgTaskCat  => {
        let orgTaskCatIndex : number = orgTaskCats.findIndex(TC => TC.id == orgTaskCat.id);
        if (orgTaskCatIndex == -1){
          hasBeenModified =  true;
        }else {
          hasBeenModified = false;
        }
      })
    }else{
      hasBeenModified = true;
    }

    if (this.taskCats.length == 0)
      hasBeenModified = false;

    return hasBeenModified;
  }

  public updateType(){
    if (this.hasBeenModified()){
      this.transformTaskCatToNum();

      if (this.toEdit.id){
        let updateType = this.bsTypeService.updateOne(this.toEdit.id, this.toEdit).subscribe({
          next : (response) => {
            if (response.id){
              let emitActionModel : ActionModelEmit<bsType> = new ActionModelEmit(actionType.EDIT, response);
              this.bsTypeService.modelsChanged.emit(emitActionModel);
              this.alertService.addNewAlert(
                new UiMessage(response.name + " has been updated", messageType.SUCCESS)
              )
            }
          },
          error : (err) => {
            this.errorService.processError(err);
          },
          complete : () => {
            updateType.unsubscribe();
          }
        })
      }

    }
  }

  private transformTaskCatToNum(){

    let numTaskCats : number[] = [];

    this.taskCats.forEach(actualTaskCat => {
      if (actualTaskCat.id)
        numTaskCats.push(actualTaskCat.id)
    })

    this.toEdit.taskCategories = numTaskCats;
  }

  ngOnDestroy(): void {
    this.formSubscript.unsubscribe();
  }
}
