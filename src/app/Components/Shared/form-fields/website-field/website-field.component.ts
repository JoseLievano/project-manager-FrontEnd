import { Component, Input, OnInit } from '@angular/core';
import { CustomTextFieldValidator } from '../../../../Util/customTextFieldValidator';
import { ControlValueAccessor, Validator } from '@angular/forms';
import { ModelService } from '../../../../Service/Shared/model.service';
import { ErrorHandlerService } from '../../../../Service/Shared/error-handler.service';
import { BusinessService } from '../../../../Service/Business/business.service';

@Component({
    selector: 'app-website-field',
    templateUrl: './website-field.component.html',
    styleUrls: ['./website-field.component.css'],
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
