import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {bsDoc} from "../../../../../Model/Business/bsDoc";
import {BsDocService} from "../../../../../Service/Business/bs-doc.service";

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.css']
})
export class ViewDocComponent implements OnInit{

  public id : number;

  public docsModel : bsDoc = new bsDoc();

  constructor(
    private activatedRoute : ActivatedRoute,
    public docsService : BsDocService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
      }
    )
  }

}
