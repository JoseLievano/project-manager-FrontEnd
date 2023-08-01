import { Component, Input } from '@angular/core';
import { ModelService } from '../../../../Service/Shared/model.service';
import { BusinessService } from '../../../../Service/Business/business.service';
import { ErrorHandlerService } from '../../../../Service/Shared/error-handler.service';
import { CustomTextFieldValidator } from '../../../../Util/customTextFieldValidator';
import {
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
} from '@angular/forms';

@Component({
    selector: 'app-first-name-field',
    templateUrl: './first-name-field.component.html',
    styleUrls: ['./first-name-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: FirstNameFieldComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: FirstNameFieldComponent,
        },
    ],
})
export class FirstNameFieldComponent<T>
    extends CustomTextFieldValidator<T>
    implements ControlValueAccessor, Validator
{
    @Input() override label: string;
    @Input() override originalValue: any;
    @Input() override isRequired: boolean = false;
    @Input() override modelService: ModelService<T>;
    @Input() override model: T;
    protected override filterFieldName: string = 'firstName';

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        super(businessService, errorService);
    }

    ngOnInit(): void {
        this.textField = document.getElementById(
            'firstName',
        ) as HTMLInputElement;
        if (this.originalValue) {
            this.textField.value = this.originalValue;
        }
    }
}
