import { Component, Input } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
} from '@angular/forms';
import { ModelService } from '../../../../Service/Shared/model.service';
import { CustomTextFieldValidator } from '../../../../Util/customTextFieldValidator';

@Component({
    selector: 'app-name-field',
    templateUrl: './name-field.component.html',
    styleUrls: ['./name-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: NameFieldComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: NameFieldComponent,
        },
    ],
})
export class NameFieldComponent<T>
    extends CustomTextFieldValidator<T>
    implements ControlValueAccessor, Validator
{
    @Input() override label: string;

    @Input() override originalValue: any;

    @Input() override isRequired: boolean = false;

    @Input() override modelService: ModelService<T>;

    @Input() override model: T;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.textField = document.getElementById('name') as HTMLInputElement;
        if (this.originalValue) {
            this.textField.value = this.originalValue;
        }
    }
}
