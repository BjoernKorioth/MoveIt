import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SocialfeedPage} from './socialfeed.page';

const routes: Routes = [
    {
        path: 'socialfeed',
        component: SocialfeedPage,
        children: [
            {
                path: 'detail',
                loadChildren: '../socialfeed-detail/socialfeed-detail.module#SocialfeedDetailPageModule'
            }

        ]
    },
    {
        path: '',
        redirectTo: 'socialfeed/detail',
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
    declarations: [SocialfeedPage]
})
export class SocialfeedPageModule {
}
