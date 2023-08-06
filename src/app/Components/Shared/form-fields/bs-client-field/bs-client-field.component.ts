import { Component, Input, OnInit } from '@angular/core';
import { CustomUserSearchFieldValidator } from '../../../../Util/CustomUserSearchFieldValidator';
import { ModelService } from '../../../../Service/Shared/model.service';
import { BusinessService } from '../../../../Service/Business/business.service';
import { ErrorHandlerService } from '../../../../Service/Shared/error-handler.service';
import {
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
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
    implements ControlValueAccessor, Validator, OnInit
{
    @Input() override label: string;
    @Input() override originalValue: any;
    @Input() override isRequired: boolean = false;
    @Input() override modelService: ModelService<T>;
    @Input() override model: T;

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        super(businessService, errorService);
    }

    ngOnInit() {
        this.userField = document.getElementById(
            'userSearch',
        ) as HTMLInputElement;
        this.filterSelector = document.getElementById(
            'filter-selector',
        ) as HTMLInputElement;
        if (this.originalValue) {
            this.userField.value = this.originalValue;
        }
    }
}
