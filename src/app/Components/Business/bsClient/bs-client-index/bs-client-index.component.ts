import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bs-client-index',
  templateUrl: './bs-client-index.component.html',
  styleUrls: ['./bs-client-index.component.css']
})
export class BsClientIndexComponent implements OnInit {

  private actualSubMenu : String = "";

  private activeMenu : String = "";

  constructor() { }

  ngOnInit(): void {
  }

  setActive(menu : String){
    this.activeMenu = menu;
    this.submenuToggle(menu);
  }

  getActiveMenu(){
    return this.activeMenu;
  }

  submenuToggle( subName : String ){

    if( this.actualSubMenu == subName ){
      this.actualSubMenu = "";
    }else {
      this.actualSubMenu = subName;
    }
  };

  getActualSubMenu(){
    return this.actualSubMenu;
  }

}
