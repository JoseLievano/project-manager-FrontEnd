import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Const} from "../../Constant/const";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {Observable} from "rxjs";
import {PageableResponse} from "../../Model/Shared/PageableResponse";

@Injectable({
  providedIn: 'root'
})
export abstract class ModelService<T>{

  constructor(protected http : HttpClient) {

  }

  public getPageListView<T>(pageRequest : PageRequest , modelURL : String) : Observable<PageableResponse<T>>{

    this.getPageListViewRestrictions(pageRequest);

    console.log("Despues del restrictions")
    console.log(pageRequest);

    let url : String = Const.API_URL + modelURL;

    return this.http.post<PageableResponse<T>>(url + "page-list-view", pageRequest);



  }

  protected getPageListViewRestrictions(pageRequest : PageRequest) {

    console.log("En el getRestriction de model service");

    console.log(pageRequest);
    if (pageRequest.sort?.length == 0){
      pageRequest.sort = [
        {"property" : "id", "isAscending": true}
      ];

    }
  }

}
