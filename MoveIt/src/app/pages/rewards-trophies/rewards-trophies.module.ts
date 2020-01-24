import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RewardsTrophiesPage } from './rewards-trophies.page';

const routes: Routes = [
  {
    path: '',
    component: RewardsTrophiesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RewardsTrophiesPage],
  exports: [RewardsTrophiesPage]
})
export class RewardsTrophiesPageModule {}
