import { Injectable } from '@angular/core';
import { ModelService } from '../Shared/model.service';
import { bsProject } from '../../Model/Project/bsProject';
import { Router } from '@angular/router';
import { LoginService } from '../Shared/login.service';
import { HttpClient } from '@angular/common/http';
import { Const } from '../../Constant/const';

@Injectable({
    providedIn: 'root',
})
export class ProjectService extends ModelService<bsProject> {
    private url: string;
    constructor(
        protected override http: HttpClient,
        protected override loginService: LoginService,
        protected override router: Router,
    ) {
        super(http, loginService, Const.API_URL + Const.bs_PROJECT, router);
        this.url = Const.API_URL + Const.bs_PROJECT;
    }

    createInstance(data: any): bsProject {
        return new bsProject(
            data.id,
            data.name,
            data.isCompleted,
            data.created,
            data.dueDate,
            data.business,
            data.client,
            data.invoices,
            data.channels,
            data.docsCategories,
            data.docs,
            data.kbCategories,
            data.kbs,
            data.tasks,
        );
    }
}
