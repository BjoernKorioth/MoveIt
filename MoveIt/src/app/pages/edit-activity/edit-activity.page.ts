import { Component, OnInit } from '@angular/core';
import {Activity} from '../../model/activity';
import {ActivityService} from '../../services/activity/activity.service';
import { Location } from  '@angular/common';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { ConsoleReporter } from 'jasmine';


@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {
  activity: Activity;
  minutes: number;
  date: string;
  time: string;
  types: Array<string>;
  intensities: Array<string>;
  todayA: Date = new Date();
  today: string = new Date().toISOString();

  constructor(private activityService: ActivityService, private location: Location, private router: Router, private toastController: ToastController) { 
    this.activity = this.router.getCurrentNavigation().extras.state.activity; // TODO: display error message if empty
    this.activity.startDateIso = this.activity.startTime.toISOString().split("T")[0];
    this.activity.startTimeIso = this.activity.startTime.toISOString().split("T")[1];
    this.activity.minutes = this.activity.getDuration();

    console.log(this.activity.startTimeIso);
    console.log(this.activity.startTime.toISOString());
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
  
  convertDate(){
    
    const t1: any = this.activity.startDateIso.split('T');
    const t2: any = this.activity.startTimeIso.split('T');
    const t3: any = t1[0].concat('T', t2);
    var timezone_offset_min = new Date().getTimezoneOffset();
    console.log(timezone_offset_min);
    
    this.activity.startTime = new Date((new Date(t3).getTime()) - timezone_offset_min*60000);
  }
      /**
     * Update an existing id
     *
     * An updated activity object and the id of the activity to be updated must be provided
     */
    editActivity() {

      const t1: any = this.activity.startDateIso.split('T');
      const t2: any = this.activity.startTimeIso.split('T');
      const t3: any = t1[0].concat('T', t2);
      var timezone_offset_min = new Date().getTimezoneOffset();
      console.log(timezone_offset_min);
      
      this.activity.startTime = new Date((new Date(t3).getTime()) - timezone_offset_min*60000);
      const newDateObj = new Date(this.activity.startTime.getTime() + this.activity.minutes * 60000);

      this.activity.endTime = new Date(newDateObj);

      if((this.todayA.getTime() - this.activity.startTime.getTime()) < 0){
        return;
      }

      console.log(this.activity);
      this.activityService.editActivity(this.activity.id, this.activity).then(
          res => {
            console.log(res);
            this.presentAlert();
          },
          err => console.log(err)
      );
     
  }


}
