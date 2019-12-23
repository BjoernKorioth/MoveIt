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

const INFORMATIONS= [
  {title: 1, text:'Superman'},
  {title: 2, text:'Batman'},
  {title: 5, text:'BatGirl'},
  {title: 3, text:'Robin'},
  {title: 4, text:'Flash'}
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
