import {Component, OnInit} from '@angular/core';
import {Activity} from '../../model/activity';
import {ActivityService} from '../../services/activity/activity.service';
import {Location} from '@angular/common';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-add-activity-manual',
    templateUrl: './add-activity-manual.page.html',
    styleUrls: ['./add-activity-manual.page.scss'],
})
export class AddActivityManualPage implements OnInit {
    activity: Activity;
    minutes: number;
    date: string;
    time: string;
    types: Array<string>;
    intensities: Array<string>;


    constructor(private activityService: ActivityService, private location: Location, public toastController: ToastController) {
        this.activity = new Activity();
        this.location = location;
        this.types = Activity.types;
        this.intensities = Activity.intensities;

    }

    goBack() {
        this.location.back();
    }

    ngOnInit() {
    }

    async presentAlert() {
        const controller = await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Activity added successfully!',
            showCloseButton: true
        }).then(toast => {
            toast.present();
        });
        /*  const alert = await this.alertController.create({
            header: 'Success',
            message: 'Activity added successfully!',
            buttons: ['OK'],
          });

          await alert.present();
          let result = await alert.onDidDismiss();
          console.log(result);*/
    }

    addActivity() {
    const date = this.date;
        const time = this.time;
        const t1: any = date.split('T');
        const t2: any = time.split('T');
        const t3: any = t1[0].concat('T', t2[1]);

        this.activity.startTime = new Date(t3);
        const newDateObj = new Date(this.activity.startTime.getTime() + this.minutes * 60000);

        this.activity.endTime = new Date(newDateObj);
        this.activityService.createActivity(this.activity).then(
            (activity) => {
                console.log(activity);
            })
            .catch(err => console.error(err)
            );
        this.presentAlert();
    }


}
