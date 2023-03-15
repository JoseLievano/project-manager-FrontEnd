import { Injectable } from '@angular/core';
import {Const} from "../../Constant/const";
import {HttpClient} from "@angular/common/http";
import {ModelService} from "../Shared/model.service";
import {Business} from "../../Model/Business/Business";
import {PageRequest} from "../../Model/Shared/pageRequest";

@Injectable({
  providedIn: 'root'
})
export class BusinessService extends ModelService<Business>{

  private url : String;

  constructor(protected override http : HttpClient) {
    super(http);
    this.url = Const.API_URL + Const.BUSINESS;
  }

}
