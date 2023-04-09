import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {Observable} from "rxjs";
import {PageableResponse} from "../../Model/Shared/PageableResponse";
import {User} from "../../Model/Shared/User";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export abstract class ModelService<T>{

  protected actualUser : User | null;

  protected apiBaseURL : string;

  protected constructor(protected http: HttpClient,
                        protected loginService : LoginService,
                        apiBaseURL : String) {
    this.actualUser = loginService.getActualUser();
    this.apiBaseURL = apiBaseURL.toString();
  }

  //Get one element
  private getOne(id : number){

  }

  //Delete one
  private deleteOne(id : number){}

  //Update one
  private updateOne(id : number){}


  //Get a list of all the items, based in the pageRequest
  public getPageListView<T>(pageRequest : PageRequest) : Observable<PageableResponse<T>>{

    this.pageListViewRestrictions(pageRequest);

    const url : string = `${this.apiBaseURL}page-list-view`;

    return this.http.post<PageableResponse<T>>(url, pageRequest);

  }

  protected pageListViewRestrictions(pageRequest: PageRequest): void {
    if (!pageRequest.sort || pageRequest.sort.length === 0) {
      pageRequest.sort = [{ property: 'id', isAscending: true }];
    }
  }

  public getButtonPermissions() : ActionsButtons[] {
    const actions: ActionsButtons[] = [];
    return actions;
  }

  public executeAction(action : string, id : number) : void {
    //Modify how actions are executed
  }

}
