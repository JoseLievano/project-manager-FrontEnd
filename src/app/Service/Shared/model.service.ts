import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  protected apiBaseURL : String;

  protected http : HttpClient;

  protected constructor(http: HttpClient,
                        actualUser: User | null,
                        apiBaseURL : String) {
    this.actualUser = actualUser;
    this.apiBaseURL = apiBaseURL;
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
  public getPageListView<T>(pageRequest : PageRequest) : Observable<PageableResponse<T>>{

    this.pageListViewRestrictions(pageRequest);

    let url2 : String = this.apiBaseURL;

    console.log("URL2: " + url2);

    return this.http.post<PageableResponse<T>>(url2 + "page-list-view", pageRequest);

  }

  protected pageListViewRestrictions(pageRequest : PageRequest) {

    if (pageRequest.sort?.length == 0){
      pageRequest.sort = [
        {"property" : "id", "isAscending": true}
      ];
    }
  }

  public getButtonPermissions() : ActionsButtons[] {
    let actions : ActionsButtons[] = [];
    return actions;
  }

  public executeAction(action : string, id : number) : void {
    //Modify how actions are executed
  }

}
