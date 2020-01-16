import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-challenges',
  templateUrl: './admin-dashboard-challenges.page.html',
  styleUrls: ['./admin-dashboard-challenges.page.scss'],
})
export class AdminDashboardChallengesPage implements OnInit {
  challenges: any;

  constructor() { 
    this.challenges= [
      {
        description: 'Run the equivalent of a marathon during one week',
        title: 'Run 100 km within a week',
        startDate: 33,
        endDate: 55,
        price: '30 Euro Amazon Gift Card'
      },
      {
        description: 'Run the equivalent of a marathon during one week',
        title: 'Run 150 km within a week',
        startDate: 33,
        endDate: 55,
        price: '30 Euro Amazon Gift Card'
      },
    ]
  }

  ngOnInit() {
  }

}
