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
import { User } from '../../../../Model/Shared/User';
import { FaIconsService } from '../../../../Service/Shared/fa-icons.service';

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
export class BsClientFieldComponent<T extends User>
    extends CustomUserSearchFieldValidator<T>
    implements ControlValueAccessor, Validator, OnInit
{
    @Input() override label: string;
    @Input() override originalValue: any;
    @Input() override isRequired: boolean = false;
    @Input() override modelService: ModelService<T>;
    @Input() override model: T;
    @Input() override multiple: boolean;

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
        iconService: FaIconsService,
    ) {
        super(businessService, errorService, iconService);
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
