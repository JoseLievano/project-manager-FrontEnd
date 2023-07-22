import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-name-field',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.css']
})
export class NameFieldComponent implements OnInit{

  @Input() label: string;

  @Input() form : FormGroup<any>;

  /*@Input() formControl : FormControl;*/

  public dataFieldLoaded = false;

  constructor() {
    /*;*/
    /*while (this.form.controls['name'] == null) {
      console.log(this.form.controls['name'] == null);
      this.form.controls['name'] = new FormControl('', Validators.required);
    }*/
  }

  ngOnInit(): void {
    console.log("OnInit", this.form);
    while (this.form.controls['name'] == null) {
      console.log(this.form.controls['name'] == null);
      this.form.addControl("name", new FormControl('xs', Validators.required));
      this.dataFieldLoaded = true;
    }
  }

  public getFormControlData(){
    console.log(this.form.controls['name']);
  }

}
