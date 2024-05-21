import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ModelService } from '../Service/Shared/model.service';
import { PageRequest } from '../Model/Shared/pageRequest';
import { BusinessService } from '../Service/Business/business.service';
import { FilterRequest } from '../Model/Shared/filterRequest';
import { OperationRequest } from '../Model/Shared/operationRequest';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from '../Service/Shared/error-handler.service';

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
    public onValidatorChange = () => {};

    //Field status flags
    public touched: boolean = false;
    public hasBeenModified: boolean = false;
    private needsAsyncValidation: boolean = false;
    public requestingAsyncValidation: boolean = false;

    //Field validation flags
    public equalToOriginal: boolean = false;
    public isEmpty: boolean = true;
    public hasLessThanTwoCharacters: boolean = true;
    public invalidUseOfSpace: boolean = true;
    public valueAlreadyExists: boolean = false;

    public disabled: boolean = false;

    public actualValue: string = '';

    protected filterFieldName: string;

    private pageRequest: PageRequest = new PageRequest(0, 100);

    // Generate a unique id using a random number
    public id =
        'app-field-' +
        Math.floor(Math.random() * Math.floor(10000000)) +
        '-' +
        Math.floor(Math.random() * Math.floor(1030000));

    protected textField: HTMLInputElement;

    private businessService: BusinessService;

    private errorService: ErrorHandlerService;

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        this.businessService = businessService;
        this.errorService = errorService;
    }

    public fieldChangeDetected(event: any) {
        if (!this.hasBeenModified) {
            this.hasBeenModified = true;
            this.touched = true;
            //Check if field needs async validation the first time the field is changed
            this.checkIfNeedsAsyncValidation();
        }
        this.actualValue = event.target.value;
        this.onChange(this.actualValue);
        this.onValidatorChange();
        //Check if field needs async validation only if field value is valid
        if (
            this.actualValue.length > 2 &&
            this.needsAsyncValidation &&
            this.customValidationFlags()
        ) {
            console.log('checking async validation');
            this.checkIfValueAlreadyExists();
        } else {
            this.valueAlreadyExists = false;
        }
    }

    public writeValue(value: any): void {
        if (this.originalValue) {
            this.textField.value = this.originalValue;
            this.actualValue = this.originalValue;
            this.touched = false;
            this.hasBeenModified = false;
        } else {
            this.actualValue = value;
            this.textField.value = this.actualValue;
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

    private setValidationFlags() {
        if (this.actualValue != null && this.actualValue != '') {
            this.isEmpty = false;
            if (this.originalValue != null) {
                this.equalToOriginal = this.actualValue == this.originalValue;
            }
            this.hasLessThanTwoCharacters = this.actualValue.length < 3;
            this.invalidUseOfSpace =
                /^\s/.test(this.actualValue) ||
                /^\s*$/.test(this.actualValue) ||
                /\s{2,}/.test(this.actualValue);
        } else if (this.isRequired) {
            this.isEmpty = true;
            this.invalidUseOfSpace = false;
            this.hasLessThanTwoCharacters = false;
        } else {
            this.isEmpty = true;
            this.invalidUseOfSpace = false;
            this.hasLessThanTwoCharacters = false;
        }
        this.customValidationFlags();
    }

    public validate(control: AbstractControl): ValidationErrors | null {
        this.setValidationFlags();

        let errors: any = null;

        if (this.requestingAsyncValidation)
            errors = { requestingAsyncValidation: true };

        if (this.isRequired && this.isEmpty) errors = { required: true };

        if (this.hasLessThanTwoCharacters && this.hasBeenModified)
            errors = { minlength: true };

        if (this.invalidUseOfSpace && !this.isEmpty)
            errors = { invalidUseOfSpace: true };

        if (this.equalToOriginal) errors = { equalToOriginal: true };

        if (this.valueAlreadyExists) errors = { valueAlreadyExists: true };

        errors = this.customValidate(errors);

        return errors;
    }

    public fieldIsInvalid(): boolean {
        if (this.touched || this.hasBeenModified) {
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

            if (this.valueAlreadyExists && this.hasBeenModified && this.touched)
                return true;

            return this.customFieldIsInvalidCheck();
        }
        return false;
    }

    public touchedAndValid(): boolean {
        return this.touched && !this.fieldIsInvalid() && this.hasBeenModified;
    }

    private checkIfNeedsAsyncValidation() {
        this.needsAsyncValidation = !!this.modelService;
    }

    private checkIfValueAlreadyExists() {
        this.requestingAsyncValidation = true;
        this.onValidatorChange();
        this.pageRequest.filter = this.getFilterRequests();
        let checkValueExistence: Subscription = this.modelService
            .getPageListView<T>(this.pageRequest)
            .subscribe({
                next: (data) => {
                    this.valueAlreadyExists = data.numberOfElements > 0;
                    this.pageRequest.filter = [];
                    this.requestingAsyncValidation = false;
                    this.onValidatorChange();
                },
                error: (err) => {
                    this.errorService.processError(err);
                },
                complete: () => {
                    checkValueExistence.unsubscribe();
                },
            });
    }

    private getFilterRequests(): FilterRequest[] {
        const businessFilter: FilterRequest =
            this.businessService.filterReqWithLoadedBusiness();

        let actualFieldFilterRequests: FilterRequest = new FilterRequest();
        actualFieldFilterRequests.field = this.filterFieldName;
        actualFieldFilterRequests.operations = [new OperationRequest()];
        actualFieldFilterRequests.operations[0].field = this.filterFieldName;
        actualFieldFilterRequests.operations[0].operator = '=';
        actualFieldFilterRequests.operations[0].value = this.actualValue;

        return [businessFilter, actualFieldFilterRequests];
    }

    protected customValidationFlags(): boolean {
        return true;
    }

    protected customValidate(
        errors: ValidationErrors | null,
    ): ValidationErrors | null {
        if (errors) return errors;
        return null;
    }

    protected customFieldIsInvalidCheck(): boolean {
        return false;
    }
}
