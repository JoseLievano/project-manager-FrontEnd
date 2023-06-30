import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {bsStatus} from "../../../../../Model/Business/bsStatus";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BusinessService} from "../../../../../Service/Business/business.service";

@Component({
  selector: 'app-add-new-bs-status',
  templateUrl: './add-new-bs-status.component.html',
  styleUrls: ['./add-new-bs-status.component.css']
})
export class AddNewBsStatusComponent implements OnInit{

  @Output() newStatus : EventEmitter<bsStatus> = new EventEmitter<bsStatus>();

  public newStatusForm : FormGroup = new FormGroup<any>({
    name : new FormControl('', {validators : [Validators.required]}),
    color : new FormControl("#3498db", {validators : [Validators.required]})
  })

  constructor(
    private businessService : BusinessService
  ) {
  }

  ngOnInit(): void {
  }

  public isValid() : boolean {
    return this.newStatusForm.valid;
  }

  public saveStatus(){
    const newStatus = new bsStatus();
    newStatus.name = this.newStatusForm.value.name;
    newStatus.color = this.newStatusForm.value.color;
    newStatus.business = this.businessService.getLoadedBusiness();
    this.newStatus.emit(newStatus);
  }

}
