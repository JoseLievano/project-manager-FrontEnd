import { Component, OnInit } from '@angular/core';
import {SidebarMenuService} from "../../../Service/Shared/sidebar-menu.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private sidebarService: SidebarMenuService) { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarService.toggleSidebar();
  }

}
