import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {BsClientService} from "../../../../../Service/Business/bs-client.service";
import {bsClient} from "../../../../../Model/Business/bsClient";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-bs-client',
  templateUrl: './edit-bs-client.component.html',
  styleUrls: ['./edit-bs-client.component.css']
})
export class EditBsClientComponent implements OnInit, OnDestroy{

  public toEditClient : bsClient = new bsClient();

  public newClientData : bsClient = new bsClient();

  public clientLoaded : boolean = false;

  public informationChangedAndValid : boolean = false;

  private paramSub : Subscription;

  public editForm = new FormGroup<any>({
    firstName : new FormControl("", {validators: [Validators.required, Validators.minLength(3)]}),
    lastName : new FormControl("", {validators: [Validators.required, Validators.minLength(3)]}),
    email : new FormControl("", {validators: [Validators.required, Validators.email]}),
    password : new FormControl("          ", {validators: [Validators.required, Validators.minLength(8)]}),
    username : new FormControl("", {validators: [Validators.required, Validators.minLength(5)]}),
    address : new FormControl(""),
    website : new FormControl(""),
    phone : new FormControl(""),
    country : new FormControl(""),
    companyName : new FormControl(""),
  })

  public editFormSub : Subscription;

  constructor(
    private bsClientService : BsClientService,
    private activatedRoute : ActivatedRoute,
    private alertService : AlertService,
    private errorService : ErrorHandlerService
  ) {

  }
  ngOnInit(): void {
    this.paramSub = this.activatedRoute.params.subscribe({
      next : (params) => {
        this.loadBsClient(params['id']);
      }
    });

    this.editFormSub = this.editForm.valueChanges.subscribe({
      next : (formData) => {
        this.changeNewClientData(formData);
      }
    });
  }

  private loadBsClient(id : number){
    let loadBsClientSub : Subscription = this.bsClientService.getOne<bsClient>(id).subscribe({
      next : (response) => {
        console.log("client",response);
        if (response.id){
          this.toEditClient = JSON.parse(JSON.stringify(response));
          this.newClientData = JSON.parse(JSON.stringify(response));
          this.setFormValues();
          this.clientLoaded = true;
        }
      },
      error : (error) => {
        this.errorService.processError(error);
      },
      complete : () => {
        loadBsClientSub.unsubscribe();
      }
    })
  }

  private setFormValues(){
    if (!this.clientLoaded){
      this.editForm.setValue({
        firstName : this.toEditClient.firstName,
        lastName : this.toEditClient.lastName,
        email : this.toEditClient.email,
        password : "          ",
        username : this.toEditClient.username,
        address : this.toEditClient.address,
        website : this.toEditClient.website,
        phone : this.toEditClient.phone,
        country : this.toEditClient.country,
        companyName : this.toEditClient.companyName,
      });
    }
    console.log("Form values: ", this.editForm.value);
  }

  public fieldIsInvalid (field : string) : boolean{
    return this.editForm.controls[field].invalid && this.editForm.controls[field].touched;
  }

  public touchedAndValid (field : string) : boolean{
    if (field == "password"){
      return  this.editForm.controls[field].touched &&
              this.editForm.controls[field].valid &&
              this.editForm.controls[field].value.length != "          ";
    }else {
      // @ts-ignore
      const fieldHasBeenModified = this.toEditClient[field] != this.newClientData[field];

      const dontHaveInvalidSpaces = !/^\s*$/.test(this.editForm.controls[field].value) && this.editForm.controls[field].value.toString().charAt(0) != " ";
      console.log("chart at 0 of ", this.editForm.controls[field].toString(), ": ", this.editForm.controls[field].toString().charAt(0));
      return this.editForm.controls[field].touched &&
              this.editForm.controls[field].valid &&
              fieldHasBeenModified &&
              dontHaveInvalidSpaces;
    }
  }

  private changeNewClientData(newFormData : any){
    this.newClientData.firstName = newFormData.firstName;
    this.newClientData.lastName = newFormData.lastName;
    this.newClientData.email = newFormData.email;
    this.newClientData.password = newFormData.password;
    this.newClientData.username = newFormData.username;
    this.newClientData.address = newFormData.address;
    this.newClientData.website = newFormData.website;
    this.newClientData.phone = newFormData.phone;
    this.newClientData.country = newFormData.country;
    this.newClientData.companyName = newFormData.companyName;
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.editFormSub.unsubscribe();
  }

}
