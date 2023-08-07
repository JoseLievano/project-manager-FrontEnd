import { ModelService } from '../Service/Shared/model.service';
import { BusinessService } from '../Service/Business/business.service';
import { ErrorHandlerService } from '../Service/Shared/error-handler.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PageRequest } from '../Model/Shared/pageRequest';
import { FilterRequest } from '../Model/Shared/filterRequest';
import { OperationRequest } from '../Model/Shared/operationRequest';

export class CustomUserSearchFieldValidator<T> {
    //Input() Fields from parent component
    public label: string;
    public originalValue: any;
    public isRequired: boolean = false;
    public modelService: ModelService<T>;
    public model: T;

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
        filterReq.operations[0].operator = '=';
        filterReq.operations[0].value = '';
        this.pageRequest.filter.push(filterReq);
    }

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

    validate(control: AbstractControl): ValidationErrors | null {
        return null;
    }

    fieldIsInvalid() {}

    touchedAndValid() {}

    fieldChangeDetected(event: any) {
        this.actualValue = event.target.value;
    }

    filterSelectorChanged(event: any) {
        this.actualFilterValue = event.target.value;
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
        filterReq.operations[0].operator = '=';
        filterReq.operations[0].value = this.actualValue;

        this.pageRequest.filter.push(filterReq);
    }

    setTouched() {}
}
