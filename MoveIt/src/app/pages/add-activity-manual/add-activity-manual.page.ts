import { Component, OnInit } from '@angular/core';
import {Activity} from '../../model/activity';
import {ActivityService} from '../../services/activity/activity.service';
import { Location } from  '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-activity-manual',
  templateUrl: './add-activity-manual.page.html',
  styleUrls: ['./add-activity-manual.page.scss'],
})
export class AddActivityManualPage implements OnInit {
  activity: Activity;
  minutes: number;
  types: Array<string>;
  intensities: Array<string>;


  constructor(private activityService: ActivityService, private location: Location, public alertController: AlertController) {
    this.activity = new Activity();
    this.location = location;
    this.types = Activity.types;
    this.intensities = Activity.intensities;

  }

  goBack(){
    this.location.back();
  }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Activity added successfully!',
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  addActivity() {
    this.activity.startTime = new Date(0);
    this.activity.endTime = new Date(this.minutes * 60 * 1000);
    this.activityService.createActivity(this.activity).then(
      (activity) => {
          console.log(activity);
        })
        .catch(err => console.error(err)
        
    );
   this.presentAlert();
  }


}
