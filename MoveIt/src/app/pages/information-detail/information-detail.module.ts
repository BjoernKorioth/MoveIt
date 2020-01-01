import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InformationDetailPage } from './information-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InformationDetailPage
  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InformationDetailPage]
})


export class InformationDetailPageModule {}
