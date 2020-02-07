import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

import {AuthenticateService} from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';
import {UserService} from 'src/app/services/user/user.service';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {

    constructor(private router: Router, private auth: AuthenticateService, private userService: UserService,
                private trackingService: TrackingService) {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
            }
        });

        this.username = userService.getUsername(); // The username is just the observable
        // If a new value is received, we have to manually update the pages object so that Angular notices the change
        this.username.subscribe(username => this.updatePages(username));
    }


    pages = [
        {
            title: 'Dashboard',
            url: '/menu/dashboard'
        }
    ];


    username: Observable<string>;
    selectedPath = '';
    viewLog: ViewLog;

    ngOnInit() {
        this.viewLog = this.trackingService.startRecordingViewTime('menu');
    }

    ngOnDestroy() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
    }

    logout() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
        this.auth.logoutUser();
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
