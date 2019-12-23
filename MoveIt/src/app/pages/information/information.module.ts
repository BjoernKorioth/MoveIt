import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InformationPage } from './information.page';

const routes: Routes = [
  {
    path: 'information',
    component: InformationPage,
    children: 
    [  
      { 
        path: 'detail', 
        loadChildren: '../information-detail/information-detail.module#InformationDetailPageModule' 
      },
      { 
        path: 'single', 
        loadChildren: '../information-single/information-single.module#InformationSinglePageModule' 
      }
    ]
  },
  {
    path: '',
    redirectTo: 'information/detail',
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
  declarations: [InformationPage]
})
export class InformationPageModule {}
