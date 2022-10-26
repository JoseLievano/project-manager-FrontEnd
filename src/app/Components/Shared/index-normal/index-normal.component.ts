import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-index-normal',
  templateUrl: './index-normal.component.html',
  styleUrls: ['./index-normal.component.css']
})
export class IndexNormalComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {

  }

  ngDoCheck(){

    let actualURL = this.router.url;

    if(actualURL == "/" || actualURL == ""){
      this.router.navigate(['dashboard']);
    }

  }

}
