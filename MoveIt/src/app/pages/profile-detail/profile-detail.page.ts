import { Component, OnInit } from '@angular/core';
import { Location } from  '@angular/common';
import { GoalService } from 'src/app/services/goal/goal.service';
import { Activity } from 'src/app/model/activity';
import { ActivityService } from 'src/app/services/activity/activity.service';
import {Goal} from '../../model/goal';
import {Observable} from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPage implements OnInit {
  activities: Observable<Activity[]>;
  goals: Observable<any>;
  goalStorage: Array<Goal>;

  constructor(private location:Location, private goalService: GoalService, private activityService: ActivityService, public alertController: AlertController) { 
    this.activities = this.activityService.getAllUserActivities();
    this.goals = this.goalService.getGoals();
    this.goals.subscribe(goals => this.goalStorage = goals);
    //this.router = router;
  }

  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Edit Profile Information',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          value:'name',
          placeholder: 'Name'
        },
        // input date with min & max
        {
          name: 'BirthDate',
          type: 'date',
          value: '5.3.1994'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
  

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }


}
