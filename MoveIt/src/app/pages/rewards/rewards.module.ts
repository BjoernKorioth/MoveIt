import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RewardsPage } from './rewards.page';

const routes: Routes = [
  {
    path: 'rewards',
    component: RewardsPage,
    children: [
      {
        path: 'overview',
        loadChildren: '../rewards-overview/rewards-overview.module#RewardsOverviewPageModule'
      },
      {
        path: 'challenges',
        loadChildren: '../rewards-challenges/rewards-challenges.module#RewardsChallengesPageModule'
    },
    {
        path: 'trophies',
        loadChildren: '../rewards-trophies/rewards-trophies.module#RewardsTrophiesPageModule'
    }
      ]
  },
  {
    path: '',
    redirectTo: 'rewards/overview',
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
  declarations: [RewardsPage]
})
export class RewardsPageModule {}
