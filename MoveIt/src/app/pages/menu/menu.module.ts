import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MenuPage} from './menu.page';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {
        path: '',
        component: MenuPage,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin},
        children:
            [
                {path: 'progress', loadChildren: '../progress/progress.module#ProgressPageModule'},
                {path: 'socialfeed', loadChildren: '../socialfeed/socialfeed.module#SocialfeedPageModule'},
                {path: 'leaderboard', loadChildren: '../leaderboard/leaderboard.module#LeaderboardPageModule'},
                {path: 'rewards', loadChildren: '../rewards/rewards.module#RewardsPageModule'},
                {path: 'information', loadChildren: '../information/information.module#InformationPageModule'},
                {path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardPageModule'},
                {path: 'add-activity', loadChildren: '../add-activity/add-activity.module#AddActivityPageModule'},
                {path: 'edit-activity', loadChildren: '../edit-activity/edit-activity.module#EditActivityPageModule'},
                {path: 'credits', loadChildren: '../credits/credits.module#CreditsPageModule'},

                {path: 'goals', loadChildren: '../goals/goals.module#GoalsPageModule'},

                {path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule'}
               


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
