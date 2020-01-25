import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard-detail',
    templateUrl: './dashboard-detail.page.html',
    styleUrls: ['./dashboard-detail.page.scss'],
})
export class DashboardDetailPage implements OnInit {
    allservices: any;

    constructor() {

        this.allservices = [
            {
                label: 'Socialfeed', 
                routerLink: '/menu/socialfeed', 
                image:'./assets/Socialfeed.png'
            }, 
            {
                label: 'Leaderboard',
                routerLink: '/menu/leaderboard',
                image: './assets/Leaderboard.png'
            },
            {
                label: 'Rewards', 
                routerLink: '/menu/rewards',
                image: './assets/Rewards.png'
            }
            /*, {
                label: 'Profile', routerLink: '/menu/profile'
            }*/
        ];
    }


    ngOnInit() {
    }

}
