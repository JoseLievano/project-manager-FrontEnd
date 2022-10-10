import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private actualTheme : String = "nocturn";

  constructor() { }

  changeTheme(theme : String){
    this.actualTheme = theme;
  }

  getActualTheme(){
    return this.actualTheme;
  }

}
