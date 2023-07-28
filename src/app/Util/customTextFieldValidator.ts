import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ModelService } from '../Service/Shared/model.service';

export class CustomTextFieldValidator<T> {
    //Input() Fields from parent component
    public label: string;
    public originalValue: any;
    public isRequired: boolean = false;
    public modelService: ModelService<T>;
    public model: T;

    //Callbacks for ControlValueAccessor and Validator
    public onChange: any = () => {};
    public onTouched: any = () => {};

    //Field status flags
    public touched: boolean = false;
    public hasBeenModified: boolean = false;

    //Field validation flags
    public equalToOriginal: boolean = false;
    public isEmpty: boolean = true;
    public hasLessThanTwoCharacters: boolean = true;
    public invalidUseOfSpace: boolean = true;

    public disabled: boolean = false;

    public actualName: string = '';

    // Generate a unique id using a random number
    public id =
        'app-field-' +
        Math.floor(Math.random() * Math.floor(10000000)) +
        '-' +
        Math.floor(Math.random() * Math.floor(1030000));

    protected textField: HTMLInputElement;

    public onValidatorChange = () => {};

    public test() {
        console.log(
            'test model and modelservice',
            this.model,
            this.modelService,
        );
    }

    public fieldChangeDetected(event: any) {
        if (!this.hasBeenModified) this.hasBeenModified = true;
        this.actualName = event.target.value;
        this.onChange(event.target.value);
        this.onValidatorChange();
    }

    public writeValue(value: any): void {
        if (this.originalValue) {
            this.textField.value = this.originalValue;
            this.actualName = this.originalValue;
            this.touched = false;
            this.hasBeenModified = false;
        } else {
            this.actualName = value;
            this.textField.value = this.actualName;
            this.touched = false;
            this.hasBeenModified = false;
        }
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public setTouched() {
        this.onTouched();
        this.touched = true;
        if (this.originalValue != null) {
            this.equalToOriginal = true;
        }
    }

    public registerOnValidatorChange(fn: () => void) {
        this.onValidatorChange = fn;
    }

    protected setValidationFlags() {
        if (this.actualName != null && this.actualName != '') {
            this.isEmpty = false;
            if (this.originalValue != null) {
                this.equalToOriginal = this.actualName == this.originalValue;
            }
            this.hasLessThanTwoCharacters = this.actualName.length < 3;
            this.invalidUseOfSpace =
                /^\s/.test(this.actualName) ||
                /^\s*$/.test(this.actualName) ||
                /\s{2,}/.test(this.actualName);
        } else if (this.isRequired) {
            this.isEmpty = true;
            this.invalidUseOfSpace = false;
            this.hasLessThanTwoCharacters = false;
        } else {
            this.isEmpty = true;
            this.invalidUseOfSpace = false;
            this.hasLessThanTwoCharacters = false;
        }
    }

    public validate(control: AbstractControl): ValidationErrors | null {
        this.setValidationFlags();
        let errors: any = null;

        if (this.isRequired && this.isEmpty) errors = { required: true };

        if (this.hasLessThanTwoCharacters && this.hasBeenModified)
            errors = { minlength: true };

        if (this.invalidUseOfSpace && !this.isEmpty)
            errors = { invalidUseOfSpace: true };

        if (this.equalToOriginal) errors = { equalToOriginal: true };

        return errors;
    }

    public fieldIsInvalid(): boolean {
        if (this.touched) {
            if (this.isEmpty && this.isRequired) return true;

            if (this.hasLessThanTwoCharacters && this.hasBeenModified)
                return true;

            if (this.invalidUseOfSpace && !this.isEmpty) return true;

            if (
                this.originalValue != null &&
                this.equalToOriginal &&
                this.hasBeenModified
            )
                return true;
        }
        return false;
    }

    public touchedAndValid(): boolean {
        return this.touched && !this.fieldIsInvalid() && this.hasBeenModified;
    }
}
