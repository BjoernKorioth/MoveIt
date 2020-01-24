import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

import {AuthenticateService} from '../../services/authentication/authentication.service';
import {PostService} from '../../services/post/post.service';
import {Observable, config} from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    pages = [
        
    ];

    dashboard = {
        title: 'Dashboard',
        url: '/menu/dashboard'
    };

    social = {
        title: 'Socialfeed',
        url: '/menu/socialfeed'
    };
    
    leaderboard = {
        title: 'Leaderboard',
        url: '/menu/leaderboard'
    };

    rewards = {
        title: 'Rewards',
        url: '/menu/rewards'
    };

    username: Observable<string>;
    group: Observable<string>;
    config: Observable<string>;
    selectedPath = '';

    constructor(private router: Router, private auth: AuthenticateService, private userService: UserService) {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
            }
        });

        this.username = auth.getUsername(); // The username is just the observable
        // If a new value is received, we have to manually update the pages object so that Angular notices the change
        this.username.subscribe(username => this.updatePages(username));

        this.group = userService.getUsergroup();
        this.group.subscribe(group => this.updateGroup(group));
    }

    logout() {
        this.auth.logoutUser();
    }

    ngOnInit() {
        this.auth.setUser();
    }

    /**
     * Update the pages of the menu
     *
     * This method updates the whole pages array when there is a new username available. This is necessary, because
     * Angular cannot detect changes in the elements of the array.
     *
     * @param username the new username
     */
    updatePages(username) {
        this.pages.push({title: username, url: '/menu/profile'});
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
                case "Dashboard":{
                    this.pages.push(this.dashboard)
                    break;
                }
                case "Leaderboard":{
                    this.pages.push(this.leaderboard)
                    break;
                }
                case "Social":{
                    this.pages.push(this.social)
                    break;
                }
                case "Rewards":{
                    this.pages.push(this.rewards)
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
}
