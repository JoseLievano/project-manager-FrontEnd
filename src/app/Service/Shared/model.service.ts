import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Const} from "../../Constant/const";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {Observable} from "rxjs";
import {PageableResponse} from "../../Model/Shared/PageableResponse";
import {User} from "../../Model/Shared/User";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";

@Injectable({
  providedIn: 'root'
})
export abstract class ModelService<T>{

  protected actualUser : User | null;

  constructor(protected http: HttpClient,
              actualUser: User | null) {
    this.actualUser = actualUser;
    // @ts-ignore
    console.log(actualUser?.firstName)
  }

  //Get one element
  private getOne(id : number){

  }

  //Delete one
  private deleteOne(id : number){

  }

  //Update one
  private updateOne(id : number){

  }


  //Get a list of all the items, based in the pageRequest
  public getPageListView<T>(pageRequest : PageRequest , modelURL : String) : Observable<PageableResponse<T>>{

    this.pageListViewRestrictions(pageRequest);

    let url : String = Const.API_URL + modelURL;

    return this.http.post<PageableResponse<T>>(url + "page-list-view", pageRequest);

  }

  protected pageListViewRestrictions(pageRequest : PageRequest) {

    if (pageRequest.sort?.length == 0){
      pageRequest.sort = [
        {"property" : "id", "isAscending": true}
      ];
    }
  }

  public getButtonPermissions() : ActionsButtons[] {

    let actions : ActionsButtons[] = [
      {actionName: "view", roles: ["X"]}
    ]

    return actions;

  }

}
