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
    selector: 'app-website-field',
    templateUrl: './website-field.component.html',
    styleUrls: ['./website-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: WebsiteFieldComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: WebsiteFieldComponent,
        },
    ],
})
export class WebsiteFieldComponent<T>
    extends CustomTextFieldValidator<T>
    implements OnInit, ControlValueAccessor, Validator, OnInit
{
    @Input() override label: string;
    @Input() override originalValue: any;
    @Input() override isRequired: boolean = false;
    @Input() override modelService: ModelService<T>;
    @Input() override model: T;
    protected override filterFieldName: string = 'website';

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        super(businessService, errorService);
    }

    ngOnInit(): void {
        this.textField = document.getElementById('website') as HTMLInputElement;
        if (this.originalValue) {
            this.textField.value = this.originalValue;
        }
    }
}
