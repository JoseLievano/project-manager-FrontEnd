import { Component, Input } from '@angular/core';
import { CustomUserSearchFieldValidator } from '../../../../Util/CustomUserSearchFieldValidator';
import { ModelService } from '../../../../Service/Shared/model.service';
import { BusinessService } from '../../../../Service/Business/business.service';
import { ErrorHandlerService } from '../../../../Service/Shared/error-handler.service';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms';

@Component({
    selector: 'app-bs-client-field',
    templateUrl: './bs-client-field.component.html',
    styleUrls: ['./bs-client-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: BsClientFieldComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: BsClientFieldComponent,
        },
    ],
})
export class BsClientFieldComponent<T>
    extends CustomUserSearchFieldValidator<T>
    implements ControlValueAccessor, Validator
{
    @Input() override label: string;
    @Input() override originalValue: any;
    @Input() override isRequired: boolean = false;
    @Input() override modelService: ModelService<T>;
    @Input() override model: T;

    requestingAsyncValidation: any;

    disabled: any;
    touched: any;
    hasBeenModified: any;
    invalidUseOfSpace: any;

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        super(businessService, errorService);
    }

    writeValue(obj: any): void {}
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    setDisabledState?(isDisabled: boolean): void {}

    public validate(control: AbstractControl): ValidationErrors | null {
        return null;
    }

    fieldIsInvalid() {}

    touchedAndValid() {}

    fieldChangeDetected($event: Event) {}

    setTouched() {}
}
