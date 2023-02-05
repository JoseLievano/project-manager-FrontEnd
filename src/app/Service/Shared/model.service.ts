import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Business} from "../../Model/Business/Business";
import {Const} from "../../Constant/const";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {Observable} from "rxjs";
import {PageableResponse} from "../../Model/Shared/PageableResponse";
import {ModelClassURLService} from "../../Util/model-class-url.service";

@Injectable({
  providedIn: 'root'
})
export class ModelService{

  constructor(private http : HttpClient, private modelURL : ModelClassURLService) {

  }

  public getPageListView<T>(pageRequest : PageRequest , model : T) : Observable<PageableResponse<T>>{

    if (pageRequest.sort == null){
      pageRequest.sort = [
        {"property" : "id", "isAscending": true}
      ];
    }

    let url : String = Const.API_URL + this.modelURL.getClassURL(model);

    return this.http.post<PageableResponse<T>>(url + "page-list-view", pageRequest);

  }

}
