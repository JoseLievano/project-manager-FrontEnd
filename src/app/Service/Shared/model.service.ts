import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Business} from "../../Model/Business/Business";
import {Const} from "../../Constant/const";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {Observable} from "rxjs";
import {PageableResponse} from "../../Model/Shared/PageableResponse";

@Injectable({
  providedIn: 'root'
})
export class ModelService{

  constructor(private http : HttpClient) {

  }

  public getPageListView<T>(pageRequest : PageRequest , model : T) : Observable<PageableResponse<T>>{

    if (pageRequest.sort == null){
      pageRequest.sort = [
        {"property" : "id", "isAscending": true}
      ];
    }

    let secondPart : String = "";

    if (model instanceof Business){
      secondPart = Const.BUSINESS;
      console.log("Is a business")
    }

    let url : String = Const.API_URL + secondPart;

    return this.http.post<PageableResponse<T>>(url + "page-list-view", pageRequest);

  }

}
