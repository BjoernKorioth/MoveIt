import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import {Observable} from 'rxjs';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

import { FCM } from '@ionic-native/fcm/ngx';

@Component({
    selector: 'app-dashboard-detail',
    templateUrl: './dashboard-detail.page.html',
    styleUrls: ['./dashboard-detail.page.scss'],
})
export class DashboardDetailPage implements OnInit {

    allServices = [];

    social = {
        label: 'Socialfeed',
        routerLink: '/menu/socialfeed',
        image: './assets/socialfeed2.png'
    };

    leaderboard = {
        label: 'Leaderboard',
        routerLink: '/menu/leaderboard',
        image: './assets/leaderboard2.png'
    };

    rewards = {
        label: 'Rewards',
        routerLink: '/menu/rewards',
        image: './assets/rewards2.png'
    };

    group: Observable<string>;
    config: Observable<string>;
    selectedPath = '';
    leaderboardB: boolean = false;
    socialB: boolean = false;
    rewardsB: boolean = false;
    constructor(private userService: UserService, private fcm: FCM,) {

        this.group = userService.getUsergroup();
        this.group.subscribe(group => this.updateGroup(group));

        this.fcm.getToken().then(token => {
            console.log(token);
            this.userService.changeUserToken(token);
        });
        this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token);
            this.userService.changeUserToken(token);
        });      
        

    }

    ngOnInit() {
    }

    /**
     * Update the group of the user
     *
     * This method updates the whole pages array when there is a new group available. This is necessary, because
     * Angular cannot detect changes in the elements of the array.
     *
     * @param group the new group
     */
    updateGroup(group) {
        // BK: as a test I delted for group 1 the rewards page
        this.config = this.userService.getGroupconfig(group);
        this.config.subscribe(config => this.setPages(config));

    }

    setPages(config) {
        const array = JSON.parse(config);
        this.allServices = [];
        for (const i of array) {
            switch (i) {
                case 'Leaderboard': {
                    this.allServices.push(this.leaderboard);
                   this.leaderboardB = true;
                    break;
                }
                case 'Social': {
                    this.allServices.push(this.social);
                    this.socialB = true;
                    break;
                }
                case 'Rewards': {
                    this.allServices.push(this.rewards);
                   this.rewardsB = true;
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

}
