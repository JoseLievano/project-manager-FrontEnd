import { Component, Input, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
    selector: 'app-date-field',
    templateUrl: './date-field.component.html',
    styleUrls: ['./date-field.component.css'],
})
export class DateFieldComponent implements OnInit {
    //Input() Fields from parent component
    @Input() label: string;
    @Input() originalDate: Date;
    @Input() isRequired: boolean;

    ngOnInit(): void {}

    onDateChange(event: MatDatepickerInputEvent<any, any>) {
        let x = event.value;
        console.log('New date: ' + x);
    }
}
