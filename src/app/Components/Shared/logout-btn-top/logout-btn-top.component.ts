import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../Service/Shared/login.service";

@Component({
  selector: 'app-logout-btn-top',
  templateUrl: './logout-btn-top.component.html',
  styleUrls: ['./logout-btn-top.component.css']
})
export class LogoutBtnTopComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.doLogout();
  }

}
