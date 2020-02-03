import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RewardsTrophiesPage } from './rewards-trophies.page';
import { TrophyPopover } from 'src/app/trophy-popover/trophy-popover.component';

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
  entryComponents: [TrophyPopover],
  declarations: [RewardsTrophiesPage, TrophyPopover],
  exports: [RewardsTrophiesPage]
})
export class RewardsTrophiesPageModule {}
