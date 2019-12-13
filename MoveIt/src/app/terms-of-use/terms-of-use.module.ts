import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TermsOfUsePage } from './terms-of-use.page';

const routes: Routes = [
  {
    path: '',
    component: TermsOfUsePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsOfUsePage]
})
export class TermsOfUsePageModule {}
