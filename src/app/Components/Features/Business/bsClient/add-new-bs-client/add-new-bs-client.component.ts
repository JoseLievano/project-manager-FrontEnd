import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusinessService} from "../../../../../Service/Business/business.service";
import {BsClientService} from "../../../../../Service/Business/bs-client.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {bsClient} from "../../../../../Model/Business/bsClient";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {UiMessage} from "../../../../../Model/Shared/ui-message";
import {messageType} from "../../../../../Constant/messageType";
import {ActionModelEmit} from "../../../../../Model/Shared/actionModelEmit";
import {actionType} from "../../../../../Constant/actionType";

@Component({
  selector: 'app-add-new-bs-client',
  templateUrl: './add-new-bs-client.component.html',
  styleUrls: ['./add-new-bs-client.component.css']
})
export class AddNewBsClientComponent implements OnInit, OnDestroy{

  private newBsClient : bsClient = new bsClient();

  public newBsClientForm : FormGroup = new FormGroup<any>({
    firstName : new FormControl("", {validators: [Validators.required, Validators.minLength(3)]}),
    lastName : new FormControl("", {validators: [Validators.required, Validators.minLength(3)]}),
    email : new FormControl("", {validators: [Validators.required, Validators.email]}),
    password : new FormControl("", {validators: [Validators.required, Validators.minLength(8)]}),
    username : new FormControl("", {validators: [Validators.required, Validators.minLength(5)]}),
    address : new FormControl(""),
    website : new FormControl(""),
    phone : new FormControl(""),
    country : new FormControl(""),
    companyName : new FormControl(""),
  })

  public validForm : boolean = false;

  private newFormSub : Subscription;

  constructor(
    private businessService : BusinessService,
    private bsClientService : BsClientService,
    private alertService : AlertService,
    private errorService : ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.newFormSub = this.newBsClientForm.valueChanges.subscribe(() => {
      this.validForm = this.newBsClientForm.valid;
    })
  }

  public fieldIsInvalid (field : string) : boolean{
    return this.newBsClientForm.controls[field].invalid && this.newBsClientForm.controls[field].touched;
  }

  public touchedAndValid (field : string) : boolean{
    return this.newBsClientForm.controls[field].touched && this.newBsClientForm.controls[field].valid;
  }

  public addNewBsClient(){
    if (this.newBsClientForm.valid){
      let newClientSub : Subscription = this.bsClientService.createNew(this.newBsClient).subscribe({
        next : (response) => {
          this.alertService.addNewAlert(
            new UiMessage("Client added successfully", messageType.SUCCESS)
          );
          const newClientEmit : ActionModelEmit<bsClient> = new ActionModelEmit<bsClient>(actionType.NEW, response)
          this.bsClientService.modelsChanged.emit(newClientEmit);
        },
        error : (error) => {
          this.errorService.processError(error);
        },
        complete : () => {
          this.newBsClientForm.reset();
          newClientSub.unsubscribe();
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.newFormSub.unsubscribe();
  }

}
