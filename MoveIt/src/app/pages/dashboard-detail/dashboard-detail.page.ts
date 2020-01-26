import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import {Observable, config} from 'rxjs';

@Component({
    selector: 'app-dashboard-detail',
    templateUrl: './dashboard-detail.page.html',
    styleUrls: ['./dashboard-detail.page.scss'],
})
export class DashboardDetailPage implements OnInit {
    
    allservices = [
        /*
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

    social = {
        label: 'Socialfeed', 
        routerLink: '/menu/socialfeed', 
        image:'./assets/Socialfeed.png'
    };
    
    leaderboard = {
        label: 'Leaderboard',
        routerLink: '/menu/leaderboard',
        image: './assets/Leaderboard.png'
    };

    rewards = {
        label: 'Rewards', 
        routerLink: '/menu/rewards',
        image: './assets/Rewards.png'
    };

    group: Observable<string>;
    config: Observable<string>;
    selectedPath = '';

    constructor(private userService: UserService) {

        this.group = userService.getUsergroup();
        this.group.subscribe(group => this.updateGroup(group));

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
        var array = JSON.parse(config)
        for (let i of array) {
            switch(i){
                case "Leaderboard":{
                    this.allservices.push(this.leaderboard)
                    break;
                }
                case "Social":{
                    this.allservices.push(this.social)
                    break;
                }
                case "Rewards":{
                    this.allservices.push(this.rewards)
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

}
