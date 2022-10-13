import {Component} from '@angular/core';
import {User} from "../../../Model/Shared/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../Service/Shared/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  form = new FormGroup({
      username : new FormControl('', {validators: [Validators.required]}),
      password : new FormControl('', {validators: [Validators.required, Validators.minLength(2)]})
    }
  )
  private User : User = new User();

  constructor(private loginService : LoginService) { }

  public doLogin(){

    this.User.username = this.form.value.username;
    this.User.password = this.form.value.password;

    console.log("pasando el user al login service: " + this.User);

    this.loginService.doLogin(this.User);

    console.log("login procesado, el usuario verificado es: " + this.loginService.getActualUser())

  }

}
