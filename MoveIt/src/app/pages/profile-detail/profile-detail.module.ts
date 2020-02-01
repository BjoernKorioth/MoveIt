import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileDetailPage } from './profile-detail.page';

import { FileSizeFormatPipe } from './file-size-format.pipe';


const routes: Routes = [
  {
    path: '',
    component: ProfileDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileDetailPage, FileSizeFormatPipe]
})
export class ProfileDetailPageModule {}
