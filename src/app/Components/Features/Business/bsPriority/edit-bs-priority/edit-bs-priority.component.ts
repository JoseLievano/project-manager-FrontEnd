import { Component, Input, OnInit } from '@angular/core';
import { bsPriority } from '../../../../../Model/Business/bsPriority';
import { BsPriorityService } from '../../../../../Service/Business/bs-priority.service';
import { BusinessService } from '../../../../../Service/Business/business.service';
import { AlertService } from '../../../../../Service/Shared/alert.service';
import { ErrorHandlerService } from '../../../../../Service/Shared/error-handler.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UiMessage } from '../../../../../Model/Shared/ui-message';
import { messageType } from '../../../../../Constant/messageType';
import { ActionModelEmit } from '../../../../../Model/Shared/actionModelEmit';
import { actionType } from '../../../../../Constant/actionType';

@Component({
    selector: 'app-edit-bs-priority',
    templateUrl: './edit-bs-priority.component.html',
    styleUrls: ['./edit-bs-priority.component.css'],
})
export class EditBsPriorityComponent implements OnInit {
    @Input() toEdit: bsPriority;

    public modalID: string;

    public editForm: FormGroup = this.formBuilder.group({
        name: [null],
    });

    public dialogModal: HTMLDialogElement;

    constructor(
        public bsPriorityService: BsPriorityService,
        private businessService: BusinessService,
        private alertService: AlertService,
        private errorService: ErrorHandlerService,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.modalID = `edit-priority-${this.toEdit.id}-${this.toEdit.name}`;
        this.toEdit.business = this.businessService.getLoadedBusiness();
    }

    public showEditModal() {
        if (this.dialogModal) {
            this.dialogModal.showModal();
        } else {
            this.dialogModal = document.getElementById(
                this.modalID,
            ) as HTMLDialogElement;
            this.dialogModal.showModal();
        }
    }

    public updatePriority() {
        let updatedPriority: bsPriority = new bsPriority();
        updatedPriority.id = this.toEdit.id;
        updatedPriority.name = this.editForm.value.name;
        if (typeof updatedPriority.id === 'number') {
            let updateRequest = this.bsPriorityService
                .updateOne(updatedPriority.id, updatedPriority)
                .subscribe({
                    next: (response) => {
                        const modelChange: ActionModelEmit<bsPriority> =
                            new ActionModelEmit<bsPriority>(
                                actionType.EDIT,
                                response,
                            );
                        this.bsPriorityService.modelsChanged.emit(modelChange);
                        this.alertService.addNewAlert(
                            new UiMessage(
                                response.name + ' priority has been changed',
                                messageType.SUCCESS,
                            ),
                        );
                    },
                    error: (err) => {
                        this.errorService.processError(err);
                    },
                    complete: () => {
                        updateRequest.unsubscribe();
                    },
                });
        }
    }
}
