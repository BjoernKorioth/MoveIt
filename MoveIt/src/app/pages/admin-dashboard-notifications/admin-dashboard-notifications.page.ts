import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-notifications',
  templateUrl: './admin-dashboard-notifications.page.html',
  styleUrls: ['./admin-dashboard-notifications.page.scss'],
})
export class AdminDashboardNotificationsPage implements OnInit {
  notifications: any;

  constructor() {
    this.notifications= [
      {
        title: 'Good Weather',
        trigger: 'Above 18°',
        description: 'The weather is good for a walk today',
        option1: 'OK!',
        option2: 'Thumbs up!',
        options: ["OK", "Thumbs up"]
      },
      {
        title: 'Good Weather',
        trigger: 'Above 18°',
        description: 'The weather is good for a walk today',
        option1: 'OK!',
        option2: 'Thumbs up!',
        options: ["OK", "Thumbs up"]
      }
    ]
   }

  ngOnInit() {
  }

}
