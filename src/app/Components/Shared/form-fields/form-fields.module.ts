import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameFieldComponent } from './name-field/name-field.component';
import { FirstNameFieldComponent } from './first-name-field/first-name-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LastNameFieldComponent } from './last-name-field/last-name-field.component';
import { UsernameFieldComponent } from './username-field/username-field.component';
import { AddressFieldComponent } from './address-field/address-field.component';
import { WebsiteFieldComponent } from './website-field/website-field.component';
import { CompanyNameFieldComponent } from './company-name-field/company-name-field.component';
import { EmailFieldComponent } from './email-field/email-field.component';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { BsClientFieldComponent } from './bs-client-field/bs-client-field.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateFieldComponent } from './date-field/date-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [
        NameFieldComponent,
        FirstNameFieldComponent,
        LastNameFieldComponent,
        UsernameFieldComponent,
        AddressFieldComponent,
        WebsiteFieldComponent,
        CompanyNameFieldComponent,
        EmailFieldComponent,
        PasswordFieldComponent,
        BsClientFieldComponent,
        DateFieldComponent,
    ],
    exports: [
        NameFieldComponent,
        FirstNameFieldComponent,
        LastNameFieldComponent,
        UsernameFieldComponent,
        AddressFieldComponent,
        WebsiteFieldComponent,
        CompanyNameFieldComponent,
        EmailFieldComponent,
        PasswordFieldComponent,
        BsClientFieldComponent,
        DateFieldComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        MatInputModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
    ],
})
export class FormFieldsModule {}
