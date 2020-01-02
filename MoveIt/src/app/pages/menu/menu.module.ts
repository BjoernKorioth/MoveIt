import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MenuPage} from './menu.page';

const routes: Routes = [
    {
        path: '',
        component: MenuPage,
        children:
            [
                {path: 'progress', loadChildren: '../progress/progress.module#ProgressPageModule'},
                {path: 'newsfeed', loadChildren: '../newsfeed/newsfeed.module#NewsfeedPageModule'},
                {path: 'leaderboard', loadChildren: '../leaderboard/leaderboard.module#LeaderboardPageModule'},
                {path: 'rewards', loadChildren: '../rewards/rewards.module#RewardsPageModule'},
                {path: 'information', loadChildren: '../information/information.module#InformationPageModule'},
                {path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardPageModule'},
                {path: 'add-activity', loadChildren: '../add-activity/add-activity.module#AddActivityPageModule'},
                {path: 'edit-activity', loadChildren: '../edit-activity/edit-activity.module#EditActivityPageModule'}
            ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MenuPage]
})
export class MenuPageModule {
}
