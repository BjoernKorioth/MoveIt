import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoalsDetailPage } from './goals-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GoalsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoalsDetailPage],
  exports: [GoalsDetailPage]
})
export class GoalsDetailPageModule {}
