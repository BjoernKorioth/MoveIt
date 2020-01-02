import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaderboardPage } from './leaderboard.page';

const routes: Routes = [
  {
    path: 'leaderboard',
    component: LeaderboardPage,
    children: [
      {
        path: 'detail',
        loadChildren: '../leaderboard-detail/leaderboard-detail.module#LeaderboardDetailPageModule'
      }
      ]
  },
  {
    path: '',
    redirectTo: 'leaderboard/detail',
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
  declarations: [LeaderboardPage]
})
export class LeaderboardPageModule {}
