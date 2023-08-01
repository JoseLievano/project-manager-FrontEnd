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
    ],
    imports: [CommonModule, ReactiveFormsModule],
})
export class FormFieldsModule {}
