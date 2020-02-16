import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ProgressPage} from './progress.page';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {
        path: 'progress',
        component: ProgressPage,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin},
        children: [
            {
                path: 'detail',
                loadChildren: '../progress-detail/progress-detail.module#ProgressDetailPageModule'
            },
            {
                path: 'edit',
                loadChildren: '../edit-activity/edit-activity.module#EditActivityPageModule'
            },
            {
                path: 'goals-old',
                loadChildren: '../goals-old/goals-old.module#GoalsOldPageModule'
            },

        ]
    },
    {
        path: '',
        redirectTo: 'progress/detail',
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
    declarations: [ProgressPage]
})
export class ProgressPageModule {
}
