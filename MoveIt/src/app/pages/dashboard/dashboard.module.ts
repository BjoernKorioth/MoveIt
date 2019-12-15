import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DashboardPage,
    children: [
      { path: 'add', loadChildren: '../add-activity/add-activity.module#AddActivityPageModule' },
      { path: 'progress', loadChildren: '../progress/progress.module#ProgressPageModule' },
      { path: 'info', loadChildren: '../information/information.module#InformationPageModule' }

    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
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
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
