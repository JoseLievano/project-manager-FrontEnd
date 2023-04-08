import {Injectable} from '@angular/core';
import {userRole} from "../../Constant/userRole";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Const} from "../../Constant/const";
import {User} from "../../Model/Shared/User";
import {Business} from "../../Model/Business/Business";
import {bsClient} from "../../Model/Business/bsClient";
import {bsEmployee} from "../../Model/Business/bsEmployee";
import {bsManager} from "../../Model/Business/bsManager";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http : HttpClient) {}

  public setInitialLocalStorageBusiness(role: String): void {

    switch (role) {
      case userRole.ADMIN : {
        window.localStorage.setItem("business", "-1");
        break;
      }
      case userRole.CLIENT: {
        window.localStorage.setItem("business", "-1");
        break;
      }
      case userRole.BS_CLIENT: {
        this.setBusiness<bsClient>(bsClient);
        break;
      }
      case userRole.BS_EMPLOYEE : {
        this.setBusiness<bsEmployee>(bsEmployee);
        break;
      }
      case userRole.BS_MANAGER : {
        this.setBusiness<bsManager>(bsManager);
        break;
      }
      default:
        window.localStorage.setItem("business", "-1");
        break;
    }
  }

  private setBusiness<T>(ctor : {new():T}) {

    let actualUser : T = new ctor();

    this.processUser<T>().subscribe({
      next : (response) => {
        actualUser = response;
        // @ts-ignore
        if (actualUser.business){
          // @ts-ignore
          let actualBusiness : Business = actualUser.business;
          // @ts-ignore
          window.localStorage.setItem("business", actualBusiness.id.toString())
        }else {
          window.localStorage.setItem("business", "-1");
        }
      }
    });
  }

  private processUser<T>( ) : Observable<T>  {

    let actualLoggedInUser : User;

    actualLoggedInUser = JSON.parse(<string> window.localStorage.getItem("userdetails"));

    let role : string = "";

    let userID : number = 0;

    if (actualLoggedInUser != null){
      // @ts-ignore
      role = actualLoggedInUser.roles[0];
      // @ts-ignore
      userID = actualLoggedInUser.id;
    }

    return this.http.get<T>(Const.API_URL + this.getRoleURL(role) + userID.toString());

  }

  private getRoleURL(role : string) : string {

    switch (role) {
      case userRole.ADMIN :
        return Const.ADMIN;
      case userRole.CLIENT :
        return Const.CLIENT;
      case userRole.BS_CLIENT :
        return Const.bs_CLIENT;
      case userRole.BS_EMPLOYEE :
        return Const.bs_EMPLOYEE;
      default :
        return "*";
    }
  }



}
