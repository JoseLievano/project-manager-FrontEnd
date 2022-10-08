import { Component } from '@angular/core';
import {ThemeService} from "./Service/Shared/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front';

  constructor(private themeService : ThemeService){}

  getTheme(){
    return this.themeService.getActualTheme();
  }

}
