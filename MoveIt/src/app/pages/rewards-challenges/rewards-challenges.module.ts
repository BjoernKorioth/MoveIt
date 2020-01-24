import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RewardsChallengesPage } from './rewards-challenges.page';

const routes: Routes = [
  {
    path: '',
    component: RewardsChallengesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RewardsChallengesPage],
  exports: [RewardsChallengesPage]
})
export class RewardsChallengesPageModule {}
