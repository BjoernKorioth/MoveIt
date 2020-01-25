import {Component, OnInit} from '@angular/core';


import {AuthenticateService} from '../../services/authentication/authentication.service';

@Component({
    selector: 'app-dashboard-detail',
    templateUrl: './dashboard-detail.page.html',
    styleUrls: ['./dashboard-detail.page.scss'],
})
export class DashboardDetailPage implements OnInit {
    allservices: any;

    constructor(private auth:AuthenticateService) {

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


   async ngOnInit() {
       await this.auth.setUser();
    }

}
