import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { ToastController} from '@ionic/angular';
import {ActivityService} from '../../services/activity/activity.service';

@Component({
    selector: 'app-add-overview',
    templateUrl: './add-overview.page.html',
    styleUrls: ['./add-overview.page.scss'],
})
export class AddOverviewPage implements OnInit {
    lastDate: Date;

    constructor(private location: Location, private activityService: ActivityService, private toastController: ToastController) {
        activityService.getLastDate().then(
            res => this.lastDate = res,
            err => console.log(err));
    }

    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }

    synchronizeActivities() {
        this.activityService.synchronizeApi().then(
            res => {
                console.log(res);
                this.toastController.create({
                    color: 'dark',
                    duration: 2000,
                    message: 'Activities successfully synchronized',
                    showCloseButton: true
                }).then(toast => {
                    toast.present();
                });
            },
            err => {
                console.log(err);
                this.toastController.create({
                    color: 'dark',
                    duration: 2000,
                    message: 'There was an error synrhconizing the activities: ' + err,
                    showCloseButton: true
                }).then(toast => {
                    toast.present();
                });
            }
        );
    }
}
