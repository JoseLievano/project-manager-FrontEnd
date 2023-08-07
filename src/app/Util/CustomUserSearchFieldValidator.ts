import { ModelService } from '../Service/Shared/model.service';
import { BusinessService } from '../Service/Business/business.service';
import { ErrorHandlerService } from '../Service/Shared/error-handler.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PageRequest } from '../Model/Shared/pageRequest';
import { FilterRequest } from '../Model/Shared/filterRequest';
import { OperationRequest } from '../Model/Shared/operationRequest';
import { User } from '../Model/Shared/User';

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
    public selectedUsers: any;
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
    protected userField: HTMLInputElement;
    protected filterSelector: HTMLInputElement;

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        this.businessService = businessService;
        this.errorService = errorService;

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
        return null;
    }

    //Helper methods
    fieldIsInvalid() {}

    touchedAndValid() {}

    fieldChangeDetected(event: any) {
        this.actualValue = event.target.value;

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

    filterSelectorChanged(event: any) {
        this.actualFilterValue = event.target.value;
        this.users = [];
        this.pageRequest.filter = [];
        this.setPageRequestFilter();
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
        let getUserSub = this.modelService
            .getPageListView<T>(this.pageRequest)
            .subscribe({
                next: (data) => {
                    if (data.content) this.users = data.content;
                    console.log('Users: ', this.users);
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
        console.log('User Results', this.users);
        return this.users.length > 0;
    }
}
