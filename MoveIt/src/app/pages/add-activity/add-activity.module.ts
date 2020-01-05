import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AddActivityPage} from './add-activity.page';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {
        path: 'add',
        component: AddActivityPage,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin},
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
export class AddActivityPageModule {
}
