import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageRequest} from "../../Model/Shared/pageRequest";
import {Observable} from "rxjs";
import {PageableResponse} from "../../Model/Shared/PageableResponse";
import {User} from "../../Model/Shared/User";
import {ActionsButtons} from "../../Model/Shared/actions-buttons";
import {LoginService} from "./login.service";
import {HiddenKey} from "../../Model/Shared/hiddenKey";
import {ViewKey} from "../../Model/Shared/ViewKey";
import {Router} from "@angular/router";
import {tableActionButton} from "../../Constant/table-action-button";

@Injectable({
  providedIn: 'root'
})
export abstract class ModelService<T>{

  protected actualUser : User | null;

  protected apiBaseURL : string;

  public modelsChanged : EventEmitter<number> = new EventEmitter<number>();

  protected constructor(protected http: HttpClient,
                        protected loginService : LoginService,
                        apiBaseURL : String,
                        protected router : Router) {
    this.actualUser = loginService.getActualUser();
    this.apiBaseURL = apiBaseURL.toString();

  }

  //Get one element
  public getOne<T>(id : number) : Observable<T>{

    const url : string = this.apiBaseURL + id;

    return this.http.get<T>(url);

  }

  public createNew<T>(entity : T) : Observable<T>{

    const url : string = this.apiBaseURL;

    return this.http.post<T>(url, entity);
  }

  //Delete one
  public deleteOne(id : number) : Observable<T>{

    const url : string = this.apiBaseURL + id;

    return this.http.delete<T>(url);

  }

  //Update one
  public updateOne(id: number, entity : T) : Observable<T>{

    console.log(entity);
    const url : string = this.apiBaseURL + id;

    return this.http.put<T>(url, entity);

  }

  //Get a list view of all the items, based in the pageRequest
  public getPageListView<T>(pageRequest : PageRequest) : Observable<PageableResponse<T>>{

    this.pageListViewRestrictions(pageRequest);

    const url : string = `${this.apiBaseURL}page-list-view`;

    return this.http.post<PageableResponse<T>>(url, pageRequest);

  }

  //Get items based in a pageRequest
  public getPageView<T>(pageRequest : PageRequest) : Observable<PageableResponse<T>>{

    this.pageListViewRestrictions(pageRequest);

    const url : string = `${this.apiBaseURL}page`;

    return this.http.post<PageableResponse<T>>(url, pageRequest);

  }

  protected pageListViewRestrictions(pageRequest: PageRequest): void {
    if (!pageRequest.sort || pageRequest.sort.length === 0) {
      pageRequest.sort = [{ property: 'id', isAscending: false }];
    }
  }

  public getButtonPermissions() : ActionsButtons[] {
    const actions: ActionsButtons[] = [];
    return actions;
  }

  public executeAction(action : string, id : number) : void {
    //Modify how actions are executed
  }

  public hiddenKeys() : HiddenKey[]{
    return [];
  }

  public canAddNew() : boolean {
    return this.checkIfRoleExistInButtonPermissions(tableActionButton.ADD);
  }

  public canDelete() : boolean {

    return this.checkIfRoleExistInButtonPermissions(tableActionButton.DELETE);

  }

  private checkIfRoleExistInButtonPermissions(buttonToCheck : string) : boolean{

    const addNewIndex = this.getButtonPermissions().findIndex(
      (action) => action.actionName === buttonToCheck
    );

    const actionObj : ActionsButtons = this.getButtonPermissions()[addNewIndex];

    const actualRoleIndex : number = actionObj.roles.findIndex(
      (role) => role === this.loginService.getActualUserRole()
    )

    return actualRoleIndex >= 0;

  }

  protected rolesAbleToAddNew () : string []{
    return [];
  }

  protected getViewKeys () : ViewKey[] {
    return [];
  }

  public getKeys() : ViewKey [] {

    const actualViewKeys : ViewKey[] = this.getViewKeys();

    const role : string = this.loginService.getActualUserRole().toString();

    let keys : ViewKey [] = [];

    actualViewKeys.forEach(key => {
      if ((key.accessRole.indexOf(role)) != -1)
        keys.push(key)
    })

    return keys;
  }

  public goToAddNewPage() : void {
    let actualUrl = this.router.url + "/new";
    this.router.navigateByUrl(actualUrl);
  }

  public abstract createInstance(data : any) : T;

  public viewElement(id : number) : void{
    let actualUrl : string = this.router.url + "/view/" + id;
    this.router.navigateByUrl(actualUrl);
  }

  public editElement(id : number) : void {
    let actualUrl : string = this.router.url + "/edit/" + id;
    this.router.navigateByUrl(actualUrl);
  }

}
