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
        {
            title: 'Dashboard',
            url: '/menu/dashboard'
        }
    ];


    username: Observable<string>;
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

}
