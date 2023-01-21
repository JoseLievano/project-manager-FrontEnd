import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Business} from "../../Model/Business/Business";
import {Const} from "../../Constant/const";
import {HttpClient} from "@angular/common/http";
import {PageableResponse} from "../../Model/Shared/PageableResponse";
import {PageRequest} from "../../Model/Shared/pageRequest";

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

  getAllList() : Observable<Business[]>{
    return this.http.get<Business[]>(Const.API_URL + Const.BUSINESS + "list");
  }

  getPageListView(pageRequest : object) : Observable<PageableResponse<Business>>{
    return this.http.post<PageableResponse<Business>>(Const.API_URL + Const.BUSINESS + "page-list-view", pageRequest);
  }


}
