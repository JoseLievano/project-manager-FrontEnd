import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../Service/Shared/login.service";
import { Router} from "@angular/router";
import {User} from "../../../Model/Shared/User";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {


  }

}
