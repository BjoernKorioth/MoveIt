import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddActivityPage } from './add-activity.page';

const routes: Routes = [
  {
    path: 'add',
    component: AddActivityPage,
    children: [
      { 
        path: 'detail',
        loadChildren: '../add-activity-detail/add-activity-detail.module#AddActivityDetailPageModule' 
      }
    ]
  },
  {
    path: '',
    redirectTo: 'add/detail',
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
  declarations: [AddActivityPage]
})
export class AddActivityPageModule {}
