import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

import {AuthenticateService} from '../../services/authentication/authentication.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    pages = [
        //{
            // TODO add dynamic loading if the value comes in later
           // title: this.Auth.loggedUserDetails().name

        //},
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

    selectedPath = '';

    constructor(private router: Router, private Auth: AuthenticateService) {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
            }
        });

    }

    logout() {
        this.Auth.logoutUser();
        // TODO sent the user back to the login page
    }

    ngOnInit() {
    }

}
