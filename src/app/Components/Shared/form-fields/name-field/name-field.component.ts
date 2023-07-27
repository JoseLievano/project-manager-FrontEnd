import {Component, Input} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator,
} from "@angular/forms";

@Component({
  selector: 'app-name-field',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NameFieldComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NameFieldComponent
    }
  ]
})
export class NameFieldComponent implements ControlValueAccessor, Validator{

  @Input() label: string;

  @Input() originalValue : any;

  public actualName : string = "";

  public onChange: any = () => {};

  public onTouched: any = () => {};

  public touched : boolean = false;

  public hasBeenModified : boolean = false;

  public equalToOriginal : boolean = false;

  public isEmpty : boolean = true;

  public invalidUseOfSpace : boolean = true;

  public disabled : boolean = false;

  public onValidatorChange = () => {};

  private nameField : HTMLInputElement;

  public hasLessThanTwoCharacters : boolean = true;

  // Generate a unique id using a random number
  public id = 'name-field-' + Math.floor(Math.random() * Math.floor(10000000)) + "-" + Math.floor(Math.random() * Math.floor(1030000));

  constructor() {
  }

  ngOnInit(): void {
    this.nameField = document.getElementById("name") as HTMLInputElement;
    if (this.originalValue){
      this.nameField.value = this.originalValue;
    }

  }

  public fieldChangeDetected(event: any) {
    if (!this.hasBeenModified)
      this.hasBeenModified = true;
    this.actualName = event.target.value;
    this.onChange(event.target.value);
    this.onValidatorChange();
  }

  writeValue(value: any): void {
    if (this.originalValue){
      this.nameField.value = this.originalValue;
      this.actualName = this.originalValue;
      this.touched = false;
      this.hasBeenModified = false;
    }else{
      this.actualName = value;
      this.nameField.value = this.actualName;
      this.touched = false;
      this.hasBeenModified = false;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setTouched() {
    this.onTouched();
    this.touched = true;
  }

  registerOnValidatorChange(fn: () => void) {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    //Check field conditions and modified fields that holds conditions state
    this.setValidationFlags();
    if (this.isEmpty || this.equalToOriginal || this.hasLessThanTwoCharacters || this.invalidUseOfSpace){
      let errors : any = {};
      errors["isEmpty"] = this.isEmpty;
      errors["equalToOriginal"] = this.equalToOriginal;
      errors["hasLessThanTwoCharacters"] = this.hasLessThanTwoCharacters;
      errors["invalidUseOfSpace"] = this.invalidUseOfSpace;
      return errors;
    }
    return null;
  }

  private setValidationFlags(){
    if (this.actualName != null && this.actualName != ""){
      this.isEmpty = false;
      if (this.originalValue != null){
        this.equalToOriginal = this.actualName == this.originalValue;
      }
      this.hasLessThanTwoCharacters = this.actualName.length < 3;
      this.invalidUseOfSpace = /^\s/.test(this.actualName) || /^\s*$/.test(this.actualName) || /\s{2,}/.test(this.actualName);
    }else{
      this.isEmpty = true;
    }
  }

}
