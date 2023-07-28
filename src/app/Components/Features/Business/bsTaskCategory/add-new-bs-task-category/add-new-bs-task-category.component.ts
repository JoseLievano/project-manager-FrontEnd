import { Component } from '@angular/core';
import { BsTaskCategoryService } from '../../../../../Service/Business/bs-task-category.service';
import { BusinessService } from '../../../../../Service/Business/business.service';
import { bsTaskCategory } from '../../../../../Model/Business/bsTaskCategory';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../../../../Service/Shared/alert.service';
import { UiMessage } from '../../../../../Model/Shared/ui-message';
import { messageType } from '../../../../../Constant/messageType';
import { ErrorHandlerService } from '../../../../../Service/Shared/error-handler.service';
import { ActionModelEmit } from '../../../../../Model/Shared/actionModelEmit';
import { actionType } from '../../../../../Constant/actionType';

@Component({
    selector: 'app-add-new-bs-task-category',
    templateUrl: './add-new-bs-task-category.component.html',
    styleUrls: ['./add-new-bs-task-category.component.css'],
})
export class AddNewBsTaskCategoryComponent {
    private taskCategory: bsTaskCategory = new bsTaskCategory();

    public model: bsTaskCategory = new bsTaskCategory();

    public newTaskCategoryForm = this.formBuilder.group({
        name: [null],
    });

    constructor(
        public bsTaskCategoryService: BsTaskCategoryService,
        private businessService: BusinessService,
        private alertService: AlertService,
        private errorService: ErrorHandlerService,
        private formBuilder: FormBuilder,
    ) {
        this.taskCategory.business = this.businessService.getLoadedBusiness();
    }

    public addNewTaskCategory() {
        this.taskCategory.name = this.newTaskCategoryForm.value.name;
        this.newTaskCategoryForm.controls.name.setValue(null);
        let taskCatSubscription = this.bsTaskCategoryService
            .createNew<bsTaskCategory>(this.taskCategory)
            .subscribe({
                next: (response) => {
                    if (response.id) {
                        const emitModel: ActionModelEmit<bsTaskCategory> =
                            new ActionModelEmit<bsTaskCategory>(
                                actionType.NEW,
                                response,
                            );
                        this.bsTaskCategoryService.modelsChanged.emit(
                            emitModel,
                        );
                    }
                    this.alertService.addNewAlert(
                        new UiMessage(
                            'New task category ' + response.name + ' added',
                            messageType.SUCCESS,
                        ),
                    );
                },
                error: (err) => {
                    this.errorService.processError(err);
                },
                complete: () => {
                    taskCatSubscription.unsubscribe();
                },
            });
    }
}
