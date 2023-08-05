import { ModelService } from '../Service/Shared/model.service';
import { BusinessService } from '../Service/Business/business.service';
import { ErrorHandlerService } from '../Service/Shared/error-handler.service';

export class CustomUserSearchFieldValidator<T> {
    //Input() Fields from parent component
    public label: string;
    public originalValue: any;
    public isRequired: boolean = false;
    public modelService: ModelService<T>;
    public model: T;

    // Generate a unique id using a random number
    public id =
        'app-user-search-field-' +
        Math.floor(Math.random() * Math.floor(10000000)) +
        '-' +
        Math.floor(Math.random() * Math.floor(1030000));

    private businessService: BusinessService;
    private errorService: ErrorHandlerService;

    constructor(
        businessService: BusinessService,
        errorService: ErrorHandlerService,
    ) {
        this.businessService = businessService;
        this.errorService = errorService;
    }
}
