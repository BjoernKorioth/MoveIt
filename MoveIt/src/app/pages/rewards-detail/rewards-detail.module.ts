import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RewardsDetailPage } from './rewards-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RewardsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RewardsDetailPage],
  exports: [RewardsDetailPage]
})
export class RewardsDetailPageModule {}
