import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

import {AuthenticateService} from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    pages = [
        {
            // The username will appear hear, this is filled in by this.updatePages() as soon as the value is available
            title: ''
            //url:'/menu/profile'

        },
        {
            title: 'Dashboard',
            url: '/menu/dashboard'
        },
        {
            title: 'Socialfeed',
            url: '/menu/socialfeed'
        },
        {
            title: 'Leaderboard',
            url: '/menu/leaderboard'
        },
        {
            title: 'Rewards',
            url: '/menu/rewards'
        },

    ];
    username: Observable<string>;
    group: Observable<string>;
    selectedPath = '';

    constructor(private router: Router, private auth: AuthenticateService) {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
            }
        });

        this.username = auth.getUsername(); // The username is just the observable
        // If a new value is received, we have to manually update the pages object so that Angular notices the change
        this.username.subscribe(username => this.updatePages(username));

        this.group = auth.getUsergroup();
        this.group.subscribe(group => this.updateGroup(group));
    }

    logout() {
        this.auth.logoutUser();
    }

    ngOnInit() {
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
        this.pages = [{title: username, url:'/menu/profile'}, ...this.pages.slice(1)];
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
        if (group = '1') {
            this.pages.pop();
        }
            
    }
}
