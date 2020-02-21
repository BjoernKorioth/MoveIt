import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification/notification.service';


@Component({
    selector: 'app-admin-dashboard-notifications',
    templateUrl: './admin-dashboard-notifications.page.html',
    styleUrls: ['./admin-dashboard-notifications.page.scss'],
})
export class AdminDashboardNotificationsPage implements OnInit {
    notifications: any;
    notification: Notification;

    constructor(private notificationService: NotificationService) {
        //this.notification = new Notification();
        /* his.notifications = [
            {
                title: 'Good Weather',
                trigger: 'Above 18°',
                description: 'The weather is good for a walk today',
                option1: 'OK!',
                option2: 'Thumbs up!',
                options: ['OK', 'Thumbs up'],
                groups: ['Group 1', 'Group 2', 'Group 3']
            },
            {
                title: 'Good Weather',
                trigger: 'Above 18°',
                description: 'The weather is good for a walk today',
                option1: 'OK!',
                option2: 'Thumbs up!',
                options: ['OK', 'Thumbs up'],
                groups: ['Group 1', 'Group 2', 'Group 3']
            }
        ];-->*/
    }

    sendNotification(uid = 'Iq7dMo8WTNb328iKX9sJyScthko2') {
        const title = 'demo title';
        const body = 'demo body';
        this.notificationService.sendUserNotification(uid, title, body, 'manualNotification').then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    sendGoalNotification(title: any, body: any) {
        this.notificationService.sendGoalNotification(title, body).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    ngOnInit() {
    }

}
