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

    console.log("in the constructor")
  }

  getAll() : Observable<Business[]>{
    return this.http.get<Business[]>(Const.API_URL + Const.BUSINESS);
  }

  getAllList() : Observable<Business[]>{
    return this.http.get<Business[]>(Const.API_URL + Const.BUSINESS + "list");
  }

  getPageListView(pageRequest : PageRequest ) : Observable<PageableResponse<Business>>{

    if (pageRequest.sort == null){
      pageRequest.sort = [
        {"property" : "id", "isAscending": true}
      ];
    }

    return this.http.post<PageableResponse<Business>>(this.url + "page-list-view", pageRequest);
  }

  saveInformationInLocalStorage(pageResponse : PageableResponse<Business>) : void{
    //Check if localStorage already has a business pageResponse
    let businessPageResponse : PageableResponse<Business> | null = JSON.parse(localStorage.getItem("business") || '{}');

  }


}
