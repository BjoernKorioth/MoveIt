import { Component, OnInit } from '@angular/core';
import { Location } from  '@angular/common';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.page.html',
  styleUrls: ['./dashboard-detail.page.scss'],
})
export class DashboardDetailPage implements OnInit {
allservices: any;
  constructor(private location: Location) { 

    this.location = location;

    this.allservices = [
      [{label:'Newsfeed', routerLink:'/menu/newsfeed'}, {label:'Leaderboard', routerLink:'/menu/leaderboard'}],
      [{label:'Rewards', routerLink:'/menu/rewards'}, {label:'Profile', routerLink:'/menu/rewards'}]
    ];
  }



  ngOnInit() {
  }


  goBack(){
    this.location.back();
  }
}
