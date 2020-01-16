import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-export',
  templateUrl: './admin-dashboard-export.page.html',
  styleUrls: ['./admin-dashboard-export.page.scss'],
})
export class AdminDashboardExportPage implements OnInit {
  users: any;
  groups: any;

  constructor() { 
    this.users = [
      {
        name: "Furkan Temel",
        group: 1
      },
      {
        name: "Max Mustermann",
        group: 2
      },
      {
        name: "Max Mustermann",
        group: 3
      },
      {
        name: "Max Mustermann",
        group: 4
      },
      {
        name: "Max Mustermann",
        group: 5
      }
    ]
  }

  ngOnInit() {
  }

}
