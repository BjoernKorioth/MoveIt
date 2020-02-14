import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreditsPage } from './credits.page';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


const routes: Routes = [
  {
    path: 'credits',
    component: CreditsPage,
    children: [
      {
        path: 'detail',
        loadChildren: '../credits-detail/credits-detail.module#CreditsDetailPageModule'
      }
      ]
  },
  {
    path: '',
    redirectTo: 'credits/detail',
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
  declarations: [CreditsPage]
})
export class CreditsPageModule {}
