import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsClientService} from "../../../../../Service/Business/bs-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {bsClient} from "../../../../../Model/Business/bsClient";
import {Subscription} from "rxjs";
import {AlertService} from "../../../../../Service/Shared/alert.service";
import {ErrorHandlerService} from "../../../../../Service/Shared/error-handler.service";
import {FaIconsService} from "../../../../../Service/Shared/fa-icons.service";

@Component({
  selector: 'app-view-bs-client',
  templateUrl: './view-bs-client.component.html',
  styleUrls: ['./view-bs-client.component.css']
})
export class ViewBsClientComponent implements OnInit, OnDestroy{

  public bsClient : bsClient = new bsClient();

  public clientLoaded : boolean = false;

  private paramSub : Subscription;

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

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
