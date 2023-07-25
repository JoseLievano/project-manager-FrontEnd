import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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

  public actualName : string = "";

  public onChange: any = () => {};

  public onTouched: any = () => {};

  public touched : boolean = false;

  public disabled : boolean = false;

  public onValidatorChange = () => {};

  private nameField : HTMLInputElement;

  public hasLessThanTwoCharacters : boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    this.nameField = document.getElementById("name") as HTMLInputElement;

  }

  public fieldChangeDetected(event: any) {
    this.onChange(event.target.value);
    this.actualName = event.target.value;
    this.onValidatorChange();
  }

  writeValue(value: any): void {
    this.actualName = value;
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

    //Check if actualName is not empty
    if (this.actualName != null && this.actualName != ""){

      //Check if actualName has 3 or more characters
      if (this.actualName.length < 3) {
        this.hasLessThanTwoCharacters = true;
        return {nameHasLessThanTwoCharacters: true};
      }else{
        this.hasLessThanTwoCharacters = false;
      }

    }else{
      return {nameIsEmpty: true};
    }



    return null;
  }



}
