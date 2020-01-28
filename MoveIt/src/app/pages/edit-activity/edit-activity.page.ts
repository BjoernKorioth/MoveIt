import { Component, OnInit } from '@angular/core';
import {Activity} from '../../model/activity';
import {ActivityService} from '../../services/activity/activity.service';
import { Location } from  '@angular/common';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {
  activity: Activity;
  minutes: number;
  types: Array<string>;
  intensities: Array<string>;

  constructor(private activityService: ActivityService, private location: Location, private router: Router, private toastController: ToastController) { 
    this.activity = this.router.getCurrentNavigation().extras.state.activity; // TODO: display error message if empty
    this.location = location;
    this.types = Activity.types;
    this.intensities = Activity.intensities;

    this.router = router;    
  }

  ngOnInit() {
    console.log('On Init');
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  goBack(){
    this.location.back();
  }

  async presentAlert() {
    const controller = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Activity edited successfully!',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    })
  }
  
      /**
     * Update an existing id
     *
     * An updated activity object and the id of the activity to be updated must be provided
     */
    editActivity() {
      /*const record = new Activity('-Lx_t1Ch4v1h7sox96XZ', {
        unit: 'km',
        value: 42.2,
        intensity: this.activity.intensity,
      });
      console.log(this.activity);*/

      // TODO replace with actual activity id
      this.activityService.editActivity(this.activity.id, this.activity).then(
          res => console.log(res),
          err => console.log(err)
      );
      this.presentAlert();
  }


}
