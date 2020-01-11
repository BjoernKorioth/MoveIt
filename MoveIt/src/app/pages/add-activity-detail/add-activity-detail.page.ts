import { Component, OnInit } from '@angular/core';
import {Activity} from '../../model/activity';
import {ActivityService} from '../../services/activity/activity.service';
import { Location } from  '@angular/common';

@Component({
  selector: 'app-add-activity-detail',
  templateUrl: './add-activity-detail.page.html',
  styleUrls: ['./add-activity-detail.page.scss'],
})
export class AddActivityDetailPage implements OnInit {
  activity: Activity;
  minutes: number;
  types: Array<string>;
  intensities: Array<string>;

  constructor(private activityService: ActivityService, private location: Location) {
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

  addActivity() {
    this.activity.startTime = new Date(0);
    this.activity.endTime = new Date(this.minutes * 60 * 1000);
    this.activityService.createActivity(this.activity).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

}
