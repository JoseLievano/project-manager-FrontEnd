import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Business} from "../../Model/Business/Business";
import {Const} from "../../Constant/const";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private url : String;

  constructor(private http : HttpClient) {
    this.url = Const.API_URL + Const.BUSINESS;
  }

  getAll() : Observable<Business[]>{
    return this.http.get<Business[]>(Const.API_URL + Const.BUSINESS);

  }

}
