import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardArticlesPage } from './admin-dashboard-articles.page';
import { ArticlesPopoverComponent } from 'src/app/articles-popover/articles-popover.component';

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
  entryComponents: [ArticlesPopoverComponent],
  declarations: [AdminDashboardArticlesPage, ArticlesPopoverComponent]
})
export class AdminDashboardArticlesPageModule {}
