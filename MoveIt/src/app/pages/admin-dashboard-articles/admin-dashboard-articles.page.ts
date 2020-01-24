import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-articles',
  templateUrl: './admin-dashboard-articles.page.html',
  styleUrls: ['./admin-dashboard-articles.page.scss'],
})
export class AdminDashboardArticlesPage implements OnInit {
  articles: any;

  constructor() {
    this.articles = [
      {
        title: 'Guidelines from the WHO',
        description: 'Intensity refers to the rate at which activity'
      },
      {
        title: 'Guidelines from the WHO',
        description: 'Intensity refers to the rate at which activity'
      }
    ]
   }

  ngOnInit() {
  }

}
