import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {bsStatus} from "../../../../../Model/Business/bsStatus";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BusinessService} from "../../../../../Service/Business/business.service";

@Component({
  selector: 'app-edit-bs-status',
  templateUrl: './edit-bs-status.component.html',
  styleUrls: ['./edit-bs-status.component.css']
})
export class EditBsStatusComponent implements OnInit{

  @Input() toEdit : bsStatus;

  public modalID : string;

  public defaultValuesSet : boolean = false;

  public editForm = new FormGroup<any>({
    name : new FormControl("", {validators : [Validators.required]}),
    color : new FormControl("", {validators : [Validators.required]})
  });

  @Output() statusUpdated : EventEmitter<bsStatus> = new EventEmitter<bsStatus>();

  constructor(
    private businessService : BusinessService
  ) {}

  ngOnInit(): void {
    this.modalID = "edit-status-modal-" + this.toEdit.id;

    if (this.toEdit.name)
      this.editForm.controls['name'].setValue(this.toEdit.name)

    if (this.toEdit.color)
      this.editForm.controls['color'].setValue(this.toEdit.color);
  }

  public showEditModal(){
    const modal : any = document.getElementById(this.modalID);
    modal.showModal();
  }

  public updateStatus(){

    console.log("Form values", this.editForm.value.name, this.editForm.value.color);

    let newStatusInfo : bsStatus = new bsStatus();
    newStatusInfo.id = this.toEdit.id;

    const formName = this.editForm.value.name;
    const formColor = this.editForm.value.color;

    if (formName){
      newStatusInfo.name = this.editForm.value.name;
    }else{
      newStatusInfo.name = this.toEdit.name;
    }

    if (formColor){
      newStatusInfo.color = formColor;
    }else{
      newStatusInfo.color = this.toEdit.color;
    }
    newStatusInfo.business = this.businessService.getLoadedBusiness();
    console.log("Pasando el status: ", newStatusInfo);
    this.statusUpdated.emit(newStatusInfo);

  }

}
