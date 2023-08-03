import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../../../Service/Business/business.service';
import { BsClientService } from '../../../../../Service/Business/bs-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { bsClient } from '../../../../../Model/Business/bsClient';
import { AlertService } from '../../../../../Service/Shared/alert.service';
import { ErrorHandlerService } from '../../../../../Service/Shared/error-handler.service';
import { UiMessage } from '../../../../../Model/Shared/ui-message';
import { messageType } from '../../../../../Constant/messageType';
import { ActionModelEmit } from '../../../../../Model/Shared/actionModelEmit';
import { actionType } from '../../../../../Constant/actionType';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-new-bs-client',
    templateUrl: './add-new-bs-client.component.html',
    styleUrls: ['./add-new-bs-client.component.css'],
})
export class AddNewBsClientComponent implements OnInit {
    private newBsClient: bsClient = new bsClient();

    public model: bsClient = new bsClient();

    public newBsClientForm: FormGroup = this.formBuilder.group({
        firstName: [null],
        lastName: [null],
        username: [null],
        email: [null],
        password: [null],
        address: [null],
        website: [null],
        companyName: [null],
    });

    constructor(
        private businessService: BusinessService,
        public bsClientService: BsClientService,
        private alertService: AlertService,
        private errorService: ErrorHandlerService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {}

    public addNewBsClient() {
        if (this.newBsClientForm.valid) {
            this.newBsClient.firstName = this.newBsClientForm.value.firstName;
            this.newBsClient.lastName = this.newBsClientForm.value.lastName;
            this.newBsClient.email = this.newBsClientForm.value.email;
            this.newBsClient.password = this.newBsClientForm.value.password;
            this.newBsClient.username = this.newBsClientForm.value.username;
            this.newBsClient.address = this.newBsClientForm.value.address;
            this.newBsClient.website = this.newBsClientForm.value.website;
            this.newBsClient.phone = this.newBsClientForm.value.phone;
            this.newBsClient.country = this.newBsClientForm.value.country;
            this.newBsClient.companyName =
                this.newBsClientForm.value.companyName;
            this.newBsClient.business =
                this.businessService.getLoadedBusiness();
            this.sendNewBsClientRequest(this.newBsClient);
        } else {
            this.alertService.addNewAlert(
                new UiMessage('Invalid client details', messageType.ERROR),
            );
        }
    }

    private sendNewBsClientRequest(newBsClient: bsClient) {
        if (this.newBsClientForm.valid) {
            let newClientSub: Subscription = this.bsClientService
                .createNew(newBsClient)
                .subscribe({
                    next: (response) => {
                        this.alertService.addNewAlert(
                            new UiMessage(
                                'Client added successfully',
                                messageType.SUCCESS,
                            ),
                        );
                        const newClientEmit: ActionModelEmit<bsClient> =
                            new ActionModelEmit<bsClient>(
                                actionType.NEW,
                                response,
                            );
                        this.bsClientService.modelsChanged.emit(newClientEmit);
                        this.newBsClientForm.reset();
                        this.router.navigateByUrl('bs_client');
                    },
                    error: (error) => {
                        this.errorService.processError(error);
                    },
                    complete: () => {
                        newClientSub.unsubscribe();
                    },
                });
        }
    }
}
