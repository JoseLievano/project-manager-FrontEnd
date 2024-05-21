import { Component, Input, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms';

@Component({
    selector: 'app-date-field',
    templateUrl: './date-field.component.html',
    styleUrls: ['./date-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DateFieldComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: DateFieldComponent,
        },
    ],
})
export class DateFieldComponent
    implements OnInit, ControlValueAccessor, Validator
{
    //Input() Fields from parent component
    @Input() label: string;
    @Input() originalDate: Date;
    @Input() isRequired: boolean;
    @Input() formToday: boolean = false;

    //Field status flags
    public touched: boolean = false;
    public hasBeenModified: boolean = false;

    //Field
    public dateField: HTMLInputElement;
    private actualDate: Date;

    //Field extra data
    public today: Date = new Date();

    ngOnInit(): void {
        this.dateField = document.getElementById(
            'date-holder',
        ) as HTMLInputElement;
    }

    onDateChange(event: MatDatepickerInputEvent<any, any>) {
        this.actualDate = event.value;
        this.dateField.value =
            this.actualDate.getDate() +
            '/' +
            this.actualDate.getMonth() +
            '/' +
            this.actualDate.getFullYear();

        //this.actualDate = Date.parse(event.value);
        let actualEpoch = Date.parse(event.value);
        this.actualDate = new Date(actualEpoch);
        console.log(this.actualDate);
        const today = new Date();
        if (today < this.actualDate) {
            console.log('Date is in the future');
        } else {
            console.log('Date is in the past');
        }
    }

    //ValueAccessor implementation
    writeValue(value: any): void {
        if (this.originalDate) {
            // @ts-ignore
            this.dateField.value = this.originalDate;
        } else {
        }
    }
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

    //Validator implementation
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        throw new Error('Method not implemented.');
    }
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error('Method not implemented.');
    }
}
