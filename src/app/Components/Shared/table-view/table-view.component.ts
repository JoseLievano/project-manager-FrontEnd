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

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent<T> implements OnInit {

  @Input() model : T;

  @Input() modelConst : String;

  @Input() modelService : ModelService<T>
  private sort : SortRequest[] = [];

  private filter : FilterRequest[];

  private operationRequest : OperationRequest[];

  private pageRequest : PageRequest = new PageRequest();

  public pageAbleResponse : PageableResponse<T> = new PageableResponse<T>();

  private modelsArray: { [key: string]: any }[] | null | undefined;

  public modelsTransformed : { [key: string]: any }[];

  public modelKeys : string[];

  public modelKeysTransformed : string[];

  private firstLoad : boolean = true;

  private windowSize : number;

  public actions : ActionsButtons[] = [];

  constructor(
    private loginService : LoginService,
  ) {
    //Set default pageRequest
    this.pageRequest.page = 0;
    this.pageRequest.size = 5;


  }

  ngOnInit(): void {



    this.getPageResponse();

    let actualUSer : User | null = this.loginService.getActualUser() != null ? this.loginService.getActualUser() : null;
    if (actualUSer != null){
      for (let i = 0; i < this.modelService.getButtonPermissions().length; i ++){
        let action = this.modelService.getButtonPermissions()[i];
        // @ts-ignore
        if (action.roles.indexOf(actualUSer.roles[0]) >= 0){
          this.actions.push(action);
        }
      }
    }

    console.log("En el init");
    console.log(this.actions);
  }

  onTROver( actions : HTMLElement) : void{
    actions.classList.remove("show-out");
    actions.classList.add("show-in");
  }

  onTRLeave(actions : HTMLElement) : void{
    actions.classList.add("show-out");
  }


  private getPageResponse() {

    let data : PageableResponse<T>;
    this.pageRequest.sort = this.sort;
    console.log("getpageresponse");
    console.log(this.pageRequest)

    this.modelService.getPageListView<T>(this.pageRequest, this.modelConst).subscribe({
      next : (response) => {
        console.log("En la respuesta");
        console.log(response);
        this.pageAbleResponse = response;
        data = response;
        // @ts-ignore
        this.modelKeys = Object.keys(data.content[0]);
        if (this.firstLoad){
          this.modelKeysTransformed = this.modelKeys.slice();
          this.firstLoad = false;
        }
        // @ts-ignore
        this.modifyModels(data.content);
      },
      error : (error) => {
        console.log(error.getError());
      }
    });

  }

  private modifyModels( data : { [key: string]: any }[] ){

    this.modelsArray = data;
    // @ts-ignore
    this.modelsTransformed = JSON.parse(JSON.stringify(data));

    this.modelsTransformed.forEach((model) => {

      let modelTomodify = model;

      for (let key in modelTomodify) {

        let insideValue = modelTomodify[key];

        if (key === "invoices"){
          console.log(insideValue);
        }

        if (insideValue != null && typeof insideValue === "object"){

          // @ts-ignore
          if (insideValue.hasOwnProperty("name")){
            // @ts-ignore
            modelTomodify[key] = insideValue.name;
          }// @ts-ignore
          else if (insideValue.hasOwnProperty("firstName")){
            // @ts-ignore
            modelTomodify[key] = insideValue.firstName;
          }
        }

      }
    });

  }

  public changeKey(keyName : string, e : Event){

    let checked : boolean = (e.target as HTMLInputElement).checked;

    if (checked){
      let indexKey = this.modelKeysTransformed.indexOf(keyName);
      if (indexKey < 0){
        let normalIndexPosition = this.modelKeys.indexOf(keyName);
        this.modelKeysTransformed.splice(normalIndexPosition, 0, keyName);
      }

    }else{
      this.modelKeysTransformed = this.modelKeysTransformed.filter(key => key !== keyName);
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


    console.log("sort after: ")
    console.log(this.sort)
    this.getPageResponse();
  }

  public checkPageRequest(){
    console.log(this.pageRequest);
    console.log(this.pageAbleResponse);
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

  setPageNumber(newPage : number){
    this.pageRequest.page = newPage - 1;
    this.getPageResponse();
  }

}
