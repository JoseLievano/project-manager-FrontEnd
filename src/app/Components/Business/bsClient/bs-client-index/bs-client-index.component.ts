import { Component, OnInit } from '@angular/core';
import {SidebarMenuService} from "../../../../Service/Shared/sidebar-menu.service";

@Component({
  selector: 'app-bs-client-index',
  templateUrl: './bs-client-index.component.html',
  styleUrls: ['./bs-client-index.component.css']
})
export class BsClientIndexComponent implements OnInit {


  constructor(private sidebarOptions : SidebarMenuService) { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarOptions.toggleSidebar();
  }

}
