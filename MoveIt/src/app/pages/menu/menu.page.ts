import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Dashboard',
      url: '/menu/dashboard'
    },
    {
      title: 'Newsfeed',
      url: '/menu/newsfeed'
    },
    {
      title: 'Leaderboard',
      url: '/menu/leaderboard'
    },
    {
      title: 'Rewards',
      url: '/menu/rewards'
    },

  ];

  selectedPath = '';

  constructor(private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url){
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

}
