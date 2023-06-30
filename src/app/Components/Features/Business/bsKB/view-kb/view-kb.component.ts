import {Component, OnInit} from '@angular/core';
import {bsKB} from "../../../../../Model/Business/bsKB";
import {ActivatedRoute} from "@angular/router";
import {BsKbService} from "../../../../../Service/Business/bs-kb.service";

@Component({
  selector: 'app-view-kb',
  templateUrl: './view-kb.component.html',
  styleUrls: ['./view-kb.component.css']
})
export class ViewKbComponent implements OnInit{

  public id : number;

  public docsModel : bsKB = new bsKB();

  constructor(
    private activatedRoute : ActivatedRoute,
    public docsService : BsKbService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
      }
    )
  }

}
