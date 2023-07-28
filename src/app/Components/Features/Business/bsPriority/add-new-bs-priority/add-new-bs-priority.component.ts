import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../../../Service/Business/business.service';
import { BsPriorityService } from '../../../../../Service/Business/bs-priority.service';
import { bsPriority } from '../../../../../Model/Business/bsPriority';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../../../Service/Shared/alert.service';
import { ErrorHandlerService } from '../../../../../Service/Shared/error-handler.service';
import { UiMessage } from '../../../../../Model/Shared/ui-message';
import { messageType } from '../../../../../Constant/messageType';
import { ActionModelEmit } from '../../../../../Model/Shared/actionModelEmit';
import { actionType } from '../../../../../Constant/actionType';

@Component({
    selector: 'app-add-new-bs-priority',
    templateUrl: './add-new-bs-priority.component.html',
    styleUrls: ['./add-new-bs-priority.component.css'],
})
export class AddNewBsPriorityComponent implements OnInit {
    private newPriority: bsPriority = new bsPriority();

    public model: bsPriority = new bsPriority();

    public newPriorityForm: FormGroup = this.formBuilder.group({
        name: [''],
    });

    constructor(
        private businessService: BusinessService,
        public bsPriorityService: BsPriorityService,
        private alertService: AlertService,
        private errorService: ErrorHandlerService,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.newPriorityForm.controls['name'].setValue('');
        //Set business of the new priority
        this.newPriority.business = this.businessService.getLoadedBusiness();
    }

    public createNewPriority() {
        this.newPriority.name = this.newPriorityForm.value.name;
        let createNewBsPriority = this.bsPriorityService
            .createNew(this.newPriority)
            .subscribe({
                next: (response) => {
                    const bsPriorityReturned: bsPriority = response;
                    if (bsPriorityReturned.name && bsPriorityReturned.id) {
                        this.alertService.addNewAlert(
                            new UiMessage(
                                'Priority ' +
                                    bsPriorityReturned.name +
                                    ' has been created',
                                messageType.SUCCESS,
                            ),
                        );
                        this.newPriorityForm.controls['name'].setValue('');
                        const emitModel: ActionModelEmit<bsPriority> =
                            new ActionModelEmit<bsPriority>(
                                actionType.NEW,
                                bsPriorityReturned,
                            );
                        this.bsPriorityService.modelsChanged.emit(emitModel);
                    }
                },
                error: (err) => {
                    this.errorService.processError(err);
                },
                complete: () => {
                    createNewBsPriority.unsubscribe();
                },
            });
    }
}
