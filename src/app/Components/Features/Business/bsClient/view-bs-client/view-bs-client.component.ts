import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsClientService} from "../../../../../Service/Business/bs-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {bsClient} from "../../../../../Model/Business/bsClient";
import {Subscription} from "rxjs";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {FaIconsService} from "../../../../../Service/Shared/fa-icons.service";
import {bsProject} from "../../../../../Model/Project/bsProject";
import {bsInvoice} from "../../../../../Model/Business/bsInvoice";

@Component({
  selector: 'app-view-bs-client',
  templateUrl: './view-bs-client.component.html',
  styleUrls: ['./view-bs-client.component.css']
})
export class ViewBsClientComponent implements OnInit, OnDestroy{

  public bsClient : bsClient = new bsClient();

  public clientLoaded : boolean = false;

  private paramSub : Subscription;

  private projects : bsProject[] = [];

  private invoices : bsInvoice[] = [];

  constructor(
    private bsClientService : BsClientService,
    private activatedRoute : ActivatedRoute,
    private alertService : AlertService,
    private errorService : ErrorHandlerService,
    private router : Router,
    public iconService : FaIconsService
  ) {
  }

  ngOnInit(): void {
    this.paramSub = this.activatedRoute.params.subscribe({
      next : (params) => {
        this.loadBsClient(params['id']);
      },
      error : (error) => {
        this.errorService.processError(error);
        this.router.navigateByUrl("/bs_client");
      }
    })
  }

  private loadBsClient(id : number){

    let loadBsClientSub : Subscription = this.bsClientService.getOne<bsClient>(id).subscribe({
      next : (response) => {
        if (response.id)
          this.bsClient = response;

        this.setProjects(response.projects);
      },
      error : (error) => {
        this.errorService.processError(error);
        this.router.navigateByUrl("/bs_client");
      },
      complete : () => {
        this.clientLoaded = true;
        loadBsClientSub.unsubscribe();
      }
    })
  }

  private setProjects(projects : bsProject[] | number[] | null ){
    if (Array.isArray(bsProject) && projects && projects.length > 0 && projects[0] instanceof bsProject){
      this.projects = projects as bsProject[];
    }
  }

  public getProjectsNumber() : number{
    return this.projects.length;
  }

  private setInvoices(invoices : bsInvoice[] | number[] | null ){
    if (Array.isArray(bsInvoice) && invoices && invoices.length > 0 && invoices[0] instanceof bsInvoice){
      this.invoices = invoices as bsInvoice[];
    }
  }

  public getPaidInvoicesValue() : number{

    if (this.invoices.length == 0)
      return 0;

    let value : number = 0;
    for (const invoice of this.invoices){
      if (invoice.isPaid)
        value += invoice.amount;
    }
    return value;
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
