import {Injectable} from '@angular/core';
import {userRole} from "../../Constant/userRole";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() {}

  public setInitialLocalStorageBusiness(role: String): void {
    console.log("setInitialLocalStorageBusiness" + role);
    switch (role) {
      case userRole.ADMIN : {
        window.localStorage.setItem("business", "-1");
        break;
      }
      case userRole.CLIENT: {
        window.localStorage.setItem("business", "-1");
        break;
      }
      default:
        window.localStorage.setItem("business", "-1");
        break;
    }
  }

}
