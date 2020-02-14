import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreditsDetailPage } from './credits-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CreditsDetailPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreditsDetailPage],
  exports: [CreditsDetailPage]
})
export class CreditsDetailPageModule {}
