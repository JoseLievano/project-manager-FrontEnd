import { Component, Input, OnInit } from '@angular/core';
import { CustomTextFieldValidator } from '../../../../Util/customTextFieldValidator';
import {
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
} from '@angular/forms';
import { ModelService } from '../../../../Service/Shared/model.service';
import { ErrorHandlerService } from '../../../../Service/Shared/error-handler.service';
import { BusinessService } from '../../../../Service/Business/business.service';

@Component({
    selector: 'app-company-name-field',
    templateUrl: './company-name-field.component.html',
    styleUrls: ['./company-name-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: CompanyNameFieldComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: CompanyNameFieldComponent,
        },
    ],
})
export class CompanyNameFieldComponent<T>
    extends CustomTextFieldValidator<T>
    implements OnInit, Validator, ControlValueAccessor
{
    @Input() override label: string;
    @Input() override originalValue: any;
    @Input() override isRequired: boolean = false;
    @Input() override modelService: ModelService<T>;
    @Input() override model: T;
    protected override filterFieldName: string = 'companyName';

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        super(businessService, errorService);
    }

    ngOnInit(): void {
        this.textField = document.getElementById(
            'companyName',
        ) as HTMLInputElement;
        if (this.originalValue) {
            this.textField.value = this.originalValue;
        }
    }
}
