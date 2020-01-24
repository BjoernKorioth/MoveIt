import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardPage } from './admin-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage,
    children: [
      {
        path: 'appconfig',
        loadChildren: '../admin-dashboard-appconfig/admin-dashboard-appconfig.module#AdminDashboardAppconfigPageModule'
      },
      {
        path: 'export',
        loadChildren: '../admin-dashboard-export/admin-dashboard-export.module#AdminDashboardExportPageModule'
      },
      {
        path: 'challenges',
        loadChildren: '../admin-dashboard-challenges/admin-dashboard-challenges.module#AdminDashboardChallengesPageModule'
      },
      {
        path: 'notifications',
        loadChildren: '../admin-dashboard-notifications/admin-dashboard-notifications.module#AdminDashboardNotificationsPageModule'
      },
      {
        path: 'articles',
        loadChildren: '../admin-dashboard-articles/admin-dashboard-articles.module#AdminDashboardArticlesPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'admin-dashboard/appconfig',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminDashboardPage]
})
export class AdminDashboardPageModule {}
