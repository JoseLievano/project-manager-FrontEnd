import {Component, Output} from '@angular/core';
import {bsClient} from "../../../../../Model/Business/bsClient";
import {BsClientService} from "../../../../../Service/Business/bs-client.service";

@Component({
  selector: 'app-bs-client-list',
  templateUrl: './bs-client-list.component.html',
  styleUrls: ['./bs-client-list.component.css']
})
export class BsClientListComponent {

  @Output() model : bsClient = new bsClient();

  constructor(
    private modelService : BsClientService
  ) {
  }

  public getClientListService () : BsClientService{
    return this.modelService;
  }
}
