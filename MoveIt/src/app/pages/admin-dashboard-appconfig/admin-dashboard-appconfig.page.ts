import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-admin-dashboard-appconfig',
  templateUrl: './admin-dashboard-appconfig.page.html',
  styleUrls: ['./admin-dashboard-appconfig.page.scss'],
})
export class AdminDashboardAppconfigPage implements OnInit {
  groups: any;
  users: any;

  

  constructor(public popoverController: PopoverController) { 
    this.groups = [
    {
      id: 1,
      featureVector: [true, false, false, false, false]
    },
    {
      id: 2,
      featureVector: [false, true, false, false, false]
    },
    {
      id: 3,
      featureVector: [false, false, true, false, false]
    },
    {
      id: 4,
      featureVector: [false, false, false, true, false]
    },
    {
      id: 5,
      featureVector: [false, false, false, false, true]
    }
    ],
    this.users = [
      {
        name: "Furkan Temel",
        groups: [true, false, false, false, false]
      },
      {
        name: "Max Mustermann",
        groups: [true, false, false, false, false]
      }
    ]

    }

  

  ngOnInit() {
  }

}
