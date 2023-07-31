import { Component, Input, OnInit } from '@angular/core';
import { ModelService } from '../../../../Service/Shared/model.service';
import {
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import { CustomTextFieldValidator } from '../../../../Util/customTextFieldValidator';
import { ErrorHandlerService } from '../../../../Service/Shared/error-handler.service';
import { BusinessService } from '../../../../Service/Business/business.service';

@Component({
    selector: 'app-email-field',
    templateUrl: './email-field.component.html',
    styleUrls: ['./email-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: EmailFieldComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: EmailFieldComponent,
        },
    ],
})
export class EmailFieldComponent<T>
    extends CustomTextFieldValidator<T>
    implements OnInit, ControlValueAccessor, Validator
{
    @Input() override label: string;
    @Input() override originalValue: any;
    @Input() override isRequired: boolean = false;
    @Input() override modelService: ModelService<T>;
    @Input() override model: T;
    protected override filterFieldName: string = 'email';

    //Custom validation flag
    public validEmailFormat: boolean = false;

    private emailRegex: RegExp =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        super(businessService, errorService);
    }

    ngOnInit(): void {
        this.textField = document.getElementById('email') as HTMLInputElement;
        if (this.originalValue) {
            this.textField.value = this.originalValue;
        }
    }

    //Modify custom validation flags to add email verification
    protected override customValidationFlags() {
        this.validEmailFormat = this.emailRegex.test(this.textField.value);
        return this.validEmailFormat;
    }

    //Check email validity in validators
    protected override customValidate(
        errors: ValidationErrors | null,
    ): ValidationErrors | null {
        if (errors) {
            return errors;
        } else {
            return this.validEmailFormat ? null : { invalidEmail: true };
        }
    }

    protected override customFieldIsInvalidCheck(): boolean {
        return !this.validEmailFormat;
    }
}
