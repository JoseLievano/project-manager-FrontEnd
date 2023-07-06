import {Component, HostListener, Input, OnInit} from '@angular/core';
import {LoginService} from "../../../Service/Shared/login.service";
import {ModelService} from "../../../Service/Shared/model.service";
import {PageableResponse} from "../../../Model/Shared/PageableResponse";
import {SortRequest} from "../../../Model/Shared/sortRequest";
import {FilterRequest} from "../../../Model/Shared/filterRequest";
import {OperationRequest} from "../../../Model/Shared/operationRequest";
import {PageRequest} from "../../../Model/Shared/pageRequest";
import {ActionsButtons} from "../../../Model/Shared/actions-buttons";
import {User} from "../../../Model/Shared/User";
import {ErrorHandlerService} from "../../../Service/Shared/error-handler.service";
import {ViewKey} from "../../../Model/Shared/ViewKey";
import {tableActionButton} from "../../../Constant/table-action-button";

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent<T> implements OnInit {

  @Input() model : T;

  @Input() modelService : ModelService<T>;

  @Input() filter : FilterRequest[];

  private sort : SortRequest[] = [];

  private operationRequest : OperationRequest[];

  private pageRequest : PageRequest = new PageRequest();

  public pageAbleResponse : PageableResponse<T> = new PageableResponse<T>();

  private modelsArray: { [key: string]: any }[] | null | undefined;

  public modelsTransformed : { [key: string]: any }[];

  public modelKeys : ViewKey[] = [];

  public modelKeysTransformed : ViewKey[];

  private firstLoad : boolean = true;

  public actions : ActionsButtons[] = [];

  private user : User | null;

  public isLoading : boolean = true;

  constructor(
    private loginService : LoginService,
    private errorHandler : ErrorHandlerService,
  ) {
    //Set default pageRequest
    this.pageRequest.page = 0;
    this.pageRequest.size = 5;
  }

  ngOnInit(): void {

    this.getPageResponse();

    this.user = this.loginService.getActualUser() != null ? this.loginService.getActualUser() : null;
    if (this.user != null){
      for (let i = 0; i < this.modelService.getButtonPermissions().length; i ++){
        let action = this.modelService.getButtonPermissions()[i];
        // @ts-ignore
        if (action.roles.indexOf(this.user.roles[0]) >= 0 && (
            action.actionName == tableActionButton.VIEW ||
            action.actionName == tableActionButton.DELETE ||
            action.actionName == tableActionButton.EDIT ||
            action.actionName == tableActionButton.LOAD
        )
        ){
          this.actions.push(action);
        }
      }
    }
  }

  onTROver( actions : HTMLElement) : void{
    actions.classList.remove("show-out");
    actions.classList.add("show-in");
  }

  onTRLeave(actions : HTMLElement) : void{
    actions.classList.add("show-out");
  }

  private getPageResponse() {

    this.isLoading = true;

    let data : PageableResponse<T>;

    this.pageRequest.sort = this.sort;

    if (this.filter){
      this.pageRequest.filter = this.filter;
    }

    this.modelService.getPageListView<T>(this.pageRequest).subscribe({
      next : (response) => {
        this.pageAbleResponse = response;
        data = response;
        this.modelKeys = this.modelService.getKeys();
        if (this.firstLoad){
          this.modelKeysTransformed = this.modelKeys.slice();
          this.firstLoad = false;
        }
        // @ts-ignore
        this.modifyModels(data.content);
        this.isLoading = false;
      },
      error : (e) => {
        this.errorHandler.processError(e.error);
      }
    });
  }

  private modifyModels( data : { [key: string]: any }[] ){

    this.modelsArray = data;
    // @ts-ignore
    this.modelsTransformed = JSON.parse(JSON.stringify(data));

    this.modelsTransformed.forEach((model) => {

      let modelToModify = model;

      for (let key in modelToModify) {

        let insideValue = modelToModify[key];

        if (insideValue != null && typeof insideValue === "object"){
          // @ts-ignore
          if (insideValue.hasOwnProperty("name")){
            // @ts-ignore
            modelToModify[key] = insideValue.name;
          }// @ts-ignore
          else if (insideValue.hasOwnProperty("firstName")){
            // @ts-ignore
            modelToModify[key] = insideValue.firstName;
          }
        }
      }
    });

  }

  public changeKey(key : ViewKey, e : Event){

    let checked : boolean = (e.target as HTMLInputElement).checked;

    if (checked){
      let indexKey = this.modelKeysTransformed.findIndex((keyToFind : ViewKey) => keyToFind.privateKeyName === key.privateKeyName && keyToFind.publicKeyName === key.publicKeyName );
      if (indexKey < 0){
        let normalIndexPosition = this.modelKeys.findIndex((keyToFind : ViewKey) => keyToFind.privateKeyName === key.privateKeyName && keyToFind.publicKeyName === key.publicKeyName );
        this.modelKeysTransformed.splice(normalIndexPosition, 0, key);
      }

    }else{
      this.modelKeysTransformed = this.modelKeysTransformed.filter(actualKey => actualKey.privateKeyName !== key.privateKeyName);
    }

  }

  public checkIfKeyIsBeingSorted(checkingKey : String) : number{

    for (let sortRequest of this.sort){
      if (sortRequest.property === checkingKey){
        if (sortRequest.isAscending){
          return 1;
        }else {
          return -1
        }
      }
    }
    return 0;
  }

  public addSortRequest(key : string){

    let number = this.checkIfKeyIsBeingSorted(key);

    if (number === 0){
      this.sort.push(
        { property : key, isAscending: true}
      )
    }else if (number === 1){
      for (let sortRequest of this.sort){
        if (sortRequest.property === key){
          sortRequest.isAscending = false;
        }
      }
    }else if (number === -1){
      for (let i = 0; i < this.sort.length; i++){
        let actualSort : SortRequest = this.sort[i];
        if (actualSort.property === key){
          this.sort.splice(i, 1);
        }
      }
    }
    this.getPageResponse();
  }

  public getPaginationNumbers() : {page: number, isTopLeft : boolean, isTopRight : boolean, isActualPage: boolean}[] {

    let totalPages : number = this.pageAbleResponse.totalPages;
    let actualPage : number = this.pageAbleResponse.number + 1;

    let newPagination : {page: number, isTopLeft : boolean, isTopRight : boolean, isActualPage: boolean}[] = [];

    //Check if there is just one page
    if (totalPages == 1){
      newPagination.push(
        {page: 1, isTopLeft: false, isTopRight: false, isActualPage: true}
      )
      return newPagination;
    }

    let left : number = actualPage - 2;

    let right : number = actualPage + 2;

    if (left <= 0){
      left = 1;
      right = left + 4;
      if (right > totalPages){
        right = totalPages;
      }
    }

    if (right > totalPages){
      right = totalPages;
      left = right - 4;
      if (left < 1){
        left = 1;
      }
    }

    for (let i = left; i < right+1; i++){

      if (i == actualPage){
        newPagination.push(
          {page: i, isTopLeft: false, isTopRight: false, isActualPage: true}
        )
      }else {
        newPagination.push(
          {page: i, isTopLeft: false, isTopRight: false, isActualPage: false}
        )
      }

    }

    //Check if we need to add a top left button
    if (actualPage > 3){
      newPagination.unshift(
        {page: 1, isTopLeft: true, isTopRight: false, isActualPage: false}
      )
    }

    //Check if we need to add a top right button
    let lastNumber = newPagination[newPagination.length-1].page;

    if (lastNumber < totalPages ) {
      newPagination.push(
        {page: totalPages, isTopLeft: false, isTopRight: true, isActualPage: false}
      )
    }
    return newPagination;

  }

  public setPageNumber(newPage : number){
    this.pageRequest.page = newPage - 1;
    this.getPageResponse();
  }

  protected executeAction(action : string, model : any){
    let id : number = model.id;
    if (id != null){
      switch (action) {
        case tableActionButton.DELETE :
          this.deleteElement(id);
          break;
        case tableActionButton.VIEW :
          this.viewElement(id);
          break;
        case tableActionButton.EDIT :
          this.editElement(id);
          break;
        default : this.modelService.executeAction(action, id);
      }
    }else{

    }
  }

  public canAddNew () : boolean{
    return this.modelService.canAddNew();
  }

  public weHaveContent() : boolean {
    if (!this.modelsTransformed)
      return false;
    return this.modelsTransformed.length > 0;
  }

  private deleteElement(id : number){
    this.modelService.deleteOne(id).subscribe({
      next : (respone : T) => {
        this.getPageResponse();
      },
      error : (e) => {
        this.errorHandler.processError(e.error);
      }
    })
  }

  private viewElement(id : number) {

    this.modelService.viewElement(id);

  }

  private editElement(id : number)  {
    this.modelService.editElement(id);
  }
}
