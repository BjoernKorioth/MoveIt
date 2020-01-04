import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

import {AuthenticateService} from '../../services/authentication/authentication.service';
import {AppComponent as App} from '../../app.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    private title: string;
    pages = [
        {
            title: this.title || 'Test'

        },
        {
            title: 'Dashboard',
            url: '/menu/dashboard'
        },
        {
            title: 'Newsfeed',
            url: '/menu/newsfeed'
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

    constructor(private router: Router, private auth: AuthenticateService) {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
            }
        });

    }

    logout() {
        this.auth.logoutUser();
        // TODO sent the user back to the login page
    }

    ngOnInit() {
        this.auth.logUser();
        console.log(this.auth.getUser());
    }

}
