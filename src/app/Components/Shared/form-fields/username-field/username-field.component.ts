import { Component, Input, OnInit } from '@angular/core';
import { CustomTextFieldValidator } from '../../../../Util/customTextFieldValidator';
import {
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
} from '@angular/forms';
import { ModelService } from '../../../../Service/Shared/model.service';
import { BusinessService } from '../../../../Service/Business/business.service';
import { ErrorHandlerService } from '../../../../Service/Shared/error-handler.service';

@Component({
    selector: 'app-username-field',
    templateUrl: './username-field.component.html',
    styleUrls: ['./username-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: UsernameFieldComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: UsernameFieldComponent,
        },
    ],
})
export class UsernameFieldComponent<T>
    extends CustomTextFieldValidator<T>
    implements ControlValueAccessor, Validator, OnInit
{
    @Input() override label: string;
    @Input() override originalValue: any;
    @Input() override isRequired: boolean = false;
    @Input() override modelService: ModelService<T>;
    @Input() override model: T;
    protected override filterFieldName: string = 'username';

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        super(businessService, errorService);
    }

    ngOnInit(): void {
        this.textField = document.getElementById(
            'username',
        ) as HTMLInputElement;
        if (this.originalValue) {
            this.textField.value = this.originalValue;
        }
    }
}
