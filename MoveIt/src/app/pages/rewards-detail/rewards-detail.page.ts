import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards-detail',
  templateUrl: './rewards-detail.page.html',
  styleUrls: ['./rewards-detail.page.scss'],
})
export class RewardsDetailPage implements OnInit {
  trophies: any;
  challenges: any;
  activeChallenges: any;

  constructor() { 
    this.trophies = [
      {
        description: 'You get this trophy for winning 10 times a daily goal.',
        title: '10 Daily Goals',
        image: './assets/Trophy.png'
      },
      {
        description: 'You get this trophy for winning 10 times a daily goal.',
        title: '10 Daily Goals',
        image: './assets/Trophy.png'
      },
      {
        description: 'You get this trophy for winning 10 times a daily goal.',
        title: '10 Daily Goals',
        image: './assets/Trophy.png'
      }
    ]
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
    this.activeChallenges= [
      {
        description: 'Run the equivalent of a marathon during one week',
        title: 'Run 50 km within a week',
        startDate: 33,
        endDate: 55,
        price: '30 Euro Amazon Gift Card'
      },
      {
        description: 'Run the equivalent of a marathon during one week',
        title: 'Run 75 km within a week',
        startDate: 33,
        endDate: 55,
        price: '30 Euro Amazon Gift Card'
      }
    ]
  }

  ngOnInit() {
  }

}
