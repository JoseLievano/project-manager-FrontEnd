import { Injectable } from '@angular/core';
import {ModelService} from "./model.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../Model/Shared/User";

@Injectable({
  providedIn: 'root'
})
export abstract class UserServiceService<T> extends ModelService<T>{


  protected constructor(http : HttpClient, actualUser : User, url : String) {
    super(http, actualUser, url);
  }
}
