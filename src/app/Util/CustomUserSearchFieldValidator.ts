import { ModelService } from '../Service/Shared/model.service';
import { BusinessService } from '../Service/Business/business.service';
import { ErrorHandlerService } from '../Service/Shared/error-handler.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PageRequest } from '../Model/Shared/pageRequest';
import { FilterRequest } from '../Model/Shared/filterRequest';
import { OperationRequest } from '../Model/Shared/operationRequest';
import { User } from '../Model/Shared/User';
import { FaIconsService } from '../Service/Shared/fa-icons.service';

export class CustomUserSearchFieldValidator<T extends User> {
    //Input() Fields from parent component
    public label: string;
    public originalValue: any;
    public isRequired: boolean = false;
    public modelService: ModelService<T>;
    public model: T;
    public multiple: boolean = false;

    //Callbacks for ControlValueAccessor and Validator
    public onChange: any = () => {};
    public onTouched: any = () => {};
    public onValidatorChange = () => {};

    //Field status
    public touched: boolean = false;
    public hasBeenModified: boolean = false;
    public requestingAsyncValidation: boolean = false;
    public disabled: boolean = false;
    public actualValue: string = '';
    protected actualFilterValue: 'id' | 'username' | 'email' = 'username';
    private pageRequest: PageRequest = new PageRequest(0, 100);
    public selectedUsers: T[] = [];
    public users: T[] = [];

    //Field validation flags
    public equalToOriginal: boolean = false;
    public isEmpty: boolean = true;
    public hasLessThanTwoCharacters: boolean = true;
    public invalidUseOfSpace: boolean = true;
    public valueAlreadyExists: boolean = false;

    // Generate a unique id using a random number
    public id =
        'app-field-' +
        Math.floor(Math.random() * Math.floor(10000000)) +
        '-' +
        Math.floor(Math.random() * Math.floor(1030000));

    private businessService: BusinessService;
    private errorService: ErrorHandlerService;
    public iconService: FaIconsService;
    protected userField: HTMLInputElement;
    protected filterSelector: HTMLInputElement;

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
        iconService: FaIconsService,
    ) {
        this.businessService = businessService;
        this.errorService = errorService;
        this.iconService = iconService;

        //Set initial pageRequest
        this.actualFilterValue = 'username';

        this.pageRequest.filter = [
            this.businessService.filterReqWithLoadedBusiness(),
        ];
        const filterReq: FilterRequest = new FilterRequest();
        filterReq.field = 'username';
        filterReq.operations = [new OperationRequest()];
        filterReq.operations[0].field = 'username';
        filterReq.operations[0].operator = ':';
        filterReq.operations[0].value = '';
        this.pageRequest.filter.push(filterReq);
    }

    //ControlValueAccessor methods
    writeValue(obj: any): void {}

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    //Validator methods
    public registerOnValidatorChange(fn: () => void) {
        this.onValidatorChange = fn;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        this.setValidationFlags();

        let errors: any = null;

        if (this.isRequired && this.isEmpty) errors = { userIsEmpty: true };

        return errors;
    }

    private setValidationFlags() {
        if (this.isRequired) {
            this.isEmpty = this.selectedUsers.length == 0;
        }
        console.log('Setting isEmpty to ' + this.isEmpty);
    }

    //Helper methods
    fieldIsInvalid() {
        return this.isEmpty && this.isRequired && this.touched;
    }

    touchedAndValid() {
        return (
            (this.touched && this.isRequired && !this.isEmpty) ||
            (this.touched && !this.isRequired)
        );
    }

    fieldChangeDetected(event: any) {
        this.actualValue = event.target.value;
        this.checkActualValue();
    }

    filterSelectorChanged(event: any) {
        this.actualFilterValue = event.target.value;
        this.users = [];
        this.pageRequest.filter = [];
        this.setPageRequestFilter();
        this.checkActualValue();
    }

    private checkActualValue() {
        if (this.actualValue.length < 3) this.users = [];

        if (this.actualFilterValue != 'id') {
            if (this.actualValue.length > 2) {
                this.setPageRequestFilter();
                this.getUsers();
            }
        } else {
            if (this.actualValue.length > 0) {
                this.setPageRequestFilter();
                this.getUsers();
            }
        }
    }

    protected setPageRequestFilter() {
        this.pageRequest.filter = [
            this.businessService.filterReqWithLoadedBusiness(),
        ];

        const filterReq: FilterRequest = new FilterRequest();
        filterReq.field = this.actualFilterValue;
        filterReq.operations = [new OperationRequest()];
        filterReq.operations[0].field = this.actualFilterValue;
        filterReq.operations[0].operator = ':';
        filterReq.operations[0].value = this.actualValue;

        this.pageRequest.filter.push(filterReq);
    }

    private getUsers() {
        this.users = [];
        this.requestingAsyncValidation = true;
        let getUserSub = this.modelService
            .getPageListView<T>(this.pageRequest)
            .subscribe({
                next: (data) => {
                    if (data.content) {
                        for (const user of data.content) {
                            this.addUserToUsersSelectionList(user);
                        }
                    }
                    this.requestingAsyncValidation = false;
                },
                error: (err) => {
                    this.errorService.processError(err);
                },
                complete: () => {
                    getUserSub.unsubscribe();
                },
            });
    }

    setTouched() {
        if (!this.touched) {
            this.touched = true;
        }
    }

    showUserResults() {
        return this.users.length > 0;
    }

    setSelectedUsers(user: T, userField: HTMLInputElement) {
        userField.value = '';
        if (this.multiple) {
            this.selectedUsers.push(user);
        } else {
            this.selectedUsers = [];
            this.selectedUsers = [user];
        }
        this.users = [];
        this.onChange(this.selectedUsers);
        this.onValidatorChange();
    }

    clearSelectedUsers(toRemoveUser: T) {
        let indexToRemove: number = 0;
        if (this.selectedUsers.length > 0) {
            indexToRemove = this.selectedUsers.findIndex(
                (user) => user.id === toRemoveUser.id,
            );
        }
        this.selectedUsers.splice(indexToRemove, 1);
        this.onValidatorChange();
    }

    private addUserToUsersSelectionList(toAddUser: T) {
        let indexToAdd: number = 0;
        indexToAdd = this.selectedUsers.findIndex(
            (user) => user.id === toAddUser.id,
        );
        if (indexToAdd === -1) {
            this.users.push(toAddUser);
        }
    }
}
