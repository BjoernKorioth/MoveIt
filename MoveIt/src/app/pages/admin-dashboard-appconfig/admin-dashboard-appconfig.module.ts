import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardAppconfigPage } from './admin-dashboard-appconfig.page';
import { AppconfigPopoverComponent } from 'src/app/appconfig-popover/appconfig-popover.component';
import { AppconfigGroupPopoverComponent } from 'src/app/appconfig-group-popover/appconfig-group-popover.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardAppconfigPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [AppconfigPopoverComponent, AppconfigGroupPopoverComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [AdminDashboardAppconfigPage, AppconfigPopoverComponent, AppconfigGroupPopoverComponent]
})
export class AdminDashboardAppconfigPageModule {}
