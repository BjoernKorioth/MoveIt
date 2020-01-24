import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  pages = [
    {
      title: 'AppConfig',
      url: '/admin-dashboard/appconfig'
    },
    {
      title: 'Export',
      url: '/admin-dashboard/export'
    },
    {
      title: 'Challenges',
      url: '/admin-dashboard/challenges'
    },
    {
      title: 'Notifications',
      url: '/admin-dashboard/notifications'
    },
    {
      title: 'Articles',
      url: '/admin-dashboard/articles'
    }

  ];

  selectedPath = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {
  }

}
