import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../Service/Shared/theme.service";

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css']
})
export class ThemeSelectorComponent implements OnInit {

  constructor(private themeSelector : ThemeService) { }

  ngOnInit(): void {
  }

  setTheme(theme : string){
    this.themeSelector.changeTheme(theme);
  }

}
