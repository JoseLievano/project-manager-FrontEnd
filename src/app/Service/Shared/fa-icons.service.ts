import { Injectable } from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faGripVertical} from "@fortawesome/free-solid-svg-icons";
@Injectable({
  providedIn: 'root'
})
export class FaIconsService {

  public faGripVertical : IconDefinition = faGripVertical;

  constructor() { }

}
