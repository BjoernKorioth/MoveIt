import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user';


@Component({
    selector: 'app-admin-dashboard-notifications',
    templateUrl: './admin-dashboard-notifications.page.html',
    styleUrls: ['./admin-dashboard-notifications.page.scss'],
})
export class AdminDashboardNotificationsPage implements OnInit {
    notifications: any;
    notification: Notification;
    users: Array<User>;

    constructor(private notificationService: NotificationService, private userService: UserService) {

        this.userService.getUsers().subscribe(data => this.users = data);
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

    sendNotification(title: any, body: any, userId: string) {
        console.log(userId);

        this.notificationService.sendUserNotification(userId, title, body, 'manualNotification').then(
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
