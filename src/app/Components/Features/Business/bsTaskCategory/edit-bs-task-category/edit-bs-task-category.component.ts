import { Component, Input, OnInit } from '@angular/core';
import { bsTaskCategory } from '../../../../../Model/Business/bsTaskCategory';
import { FormBuilder } from '@angular/forms';
import { BsTaskCategoryService } from '../../../../../Service/Business/bs-task-category.service';
import { BusinessService } from '../../../../../Service/Business/business.service';
import { AlertService } from '../../../../../Service/Shared/alert.service';
import { UiMessage } from '../../../../../Model/Shared/ui-message';
import { messageType } from '../../../../../Constant/messageType';
import { ErrorHandlerService } from '../../../../../Service/Shared/error-handler.service';
import { ActionModelEmit } from '../../../../../Model/Shared/actionModelEmit';
import { actionType } from '../../../../../Constant/actionType';

@Component({
    selector: 'app-edit-bs-task-category',
    templateUrl: './edit-bs-task-category.component.html',
    styleUrls: ['./edit-bs-task-category.component.css'],
})
export class EditBsTaskCategoryComponent implements OnInit {
    @Input() toEdit: bsTaskCategory;

    public model: bsTaskCategory = new bsTaskCategory();

    public modalID: string;

    public editForm = this.formBuilder.group({
        name: [null],
    });

    constructor(
        public bsTaskCategoryService: BsTaskCategoryService,
        private businessService: BusinessService,
        private alertService: AlertService,
        private errorService: ErrorHandlerService,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.modalID = 'edit-task-cat-modal-' + this.toEdit.id;
    }

    public showEditModal() {
        const modal: any = document.getElementById(this.modalID);
        modal.showModal();
    }

    public updateTaskCategory() {
        let newTaskCat: bsTaskCategory = new bsTaskCategory();
        newTaskCat.name = this.editForm.value.name;
        newTaskCat.id = this.toEdit.id;
        newTaskCat.business = this.businessService.getLoadedBusiness();
        this.sendUpdateRequest(newTaskCat);
    }

    private sendUpdateRequest(newTaskCat: bsTaskCategory) {
        if (newTaskCat.id) {
            let updateReq = this.bsTaskCategoryService
                .updateOne(newTaskCat.id, newTaskCat)
                .subscribe({
                    next: (response) => {
                        const emitModel: ActionModelEmit<bsTaskCategory> =
                            new ActionModelEmit<bsTaskCategory>(
                                actionType.EDIT,
                                response,
                            );
                        this.bsTaskCategoryService.modelsChanged.emit(
                            emitModel,
                        );
                        this.alertService.addNewAlert(
                            new UiMessage(
                                'New Task Category ' +
                                    response.name +
                                    ' has been added',
                                messageType.SUCCESS,
                            ),
                        );
                    },
                    error: (err) => {
                        this.errorService.processError(err);
                    },
                    complete: () => {
                        updateReq.unsubscribe();
                    },
                });
        }
    }
}
