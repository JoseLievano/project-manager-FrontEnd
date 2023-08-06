import { Component } from '@angular/core';
import { bsProject } from '../../../../../Model/Project/bsProject';
import { FormBuilder } from '@angular/forms';
import { ProjectService } from '../../../../../Service/Project/project.service';
import { BusinessService } from '../../../../../Service/Business/business.service';
import { AlertService } from '../../../../../Service/Shared/alert.service';
import { ErrorHandlerService } from '../../../../../Service/Shared/error-handler.service';

@Component({
    selector: 'app-add-new-project',
    templateUrl: './add-new-project.component.html',
    styleUrls: ['./add-new-project.component.css'],
})
export class AddNewProjectComponent {
    public model = new bsProject();

    public newProjectForm = this.formBuilder.group({
        name: [null],
        client: [null],
    });

    constructor(
        private formBuilder: FormBuilder,
        public projectService: ProjectService,
        private businessService: BusinessService,
        private alertService: AlertService,
        private errorService: ErrorHandlerService,
    ) {
        this.model.business = this.businessService.getLoadedBusiness();
    }

    public addNewProject() {}
}
