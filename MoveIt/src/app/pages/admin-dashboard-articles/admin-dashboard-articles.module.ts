import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardArticlesPage } from './admin-dashboard-articles.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardArticlesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminDashboardArticlesPage]
})
export class AdminDashboardArticlesPageModule {}
