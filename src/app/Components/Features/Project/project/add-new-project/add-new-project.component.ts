import { Component } from '@angular/core';
import { bsProject } from '../../../../../Model/Project/bsProject';
import { FormBuilder, ValidationErrors } from '@angular/forms';
import { ProjectService } from '../../../../../Service/Project/project.service';
import { BusinessService } from '../../../../../Service/Business/business.service';
import { AlertService } from '../../../../../Service/Shared/alert.service';
import { ErrorHandlerService } from '../../../../../Service/Shared/error-handler.service';
import { BsClientService } from '../../../../../Service/Business/bs-client.service';
import { bsClient } from '../../../../../Model/Business/bsClient';

@Component({
    selector: 'app-add-new-project',
    templateUrl: './add-new-project.component.html',
    styleUrls: ['./add-new-project.component.css'],
})
export class AddNewProjectComponent {
    public model = new bsProject();
    public clientModel: bsClient = new bsClient();

    public newProjectForm = this.formBuilder.group({
        name: [null],
        client: [null],
        dueDate: [null],
    });

    constructor(
        private formBuilder: FormBuilder,
        public projectService: ProjectService,
        private businessService: BusinessService,
        public clientService: BsClientService,
        private alertService: AlertService,
        private errorService: ErrorHandlerService,
    ) {
        this.model.business = this.businessService.getLoadedBusiness();
    }

    public addNewProject() {
        let newProject = new bsProject();
        console.log(this.newProjectForm.controls.name.value);
        console.log(this.newProjectForm.controls.client.value);
        console.log(this.newProjectForm.controls.dueDate.value);
        newProject.name = this.newProjectForm.controls.name.value;
    }

    /*getFormValidationErrors() {
        Object.keys(this.newProjectForm.controls).forEach((key) => {
            const controlErrors = this.newProjectForm.get(key)?.errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach((keyError) => {
                    console.log(
                        'Key control: ' +
                            key +
                            ', keyError: ' +
                            keyError +
                            ', err value: ',
                        controlErrors[keyError],
                    );
                });
            }
        });
    }*/
}
