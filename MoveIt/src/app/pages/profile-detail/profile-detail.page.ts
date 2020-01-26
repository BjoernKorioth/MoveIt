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

  constructor(private location:Location, private goalService: GoalService, private activityService: ActivityService) { 
    this.activities = this.activityService.getAllUserActivities();
    this.goals = this.goalService.getGoals();
    this.goals.subscribe(goals => this.goalStorage = goals);
    //this.router = router;
  }


  

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }


}
