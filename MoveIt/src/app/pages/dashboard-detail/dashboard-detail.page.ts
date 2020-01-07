import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.page.html',
  styleUrls: ['./dashboard-detail.page.scss'],
})
export class DashboardDetailPage implements OnInit {
allservices: any;
  constructor() { 

    this.allservices = [
      [{label:'Newsfeed'}, {label:'Leaderboard'}],
      [{label:'Rewards'}, {label:'Profile'}]
    ];
  }

  ngOnInit() {
  }

}
