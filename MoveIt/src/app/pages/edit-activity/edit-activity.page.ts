import { Component, OnInit } from '@angular/core';
import {Activity} from '../../model/activity';
import {ActivityService} from '../../services/activity/activity.service';
import { Location } from  '@angular/common';

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

  constructor(private activityService: ActivityService, private location: Location) { 
    this.activity = new Activity();
    this.location = location;
    this.types = Activity.types;
    this.intensities = Activity.intensities;
  }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }
  
      /**
     * Update an existing id
     *
     * An updated activity object and the id of the activity to be updated must be provided
     */
    editActivity() {
      const record = new Activity('-Lx_t1Ch4v1h7sox96XZ', {
        unit: 'km',
        value: 42.2,
        intensity: this.activity.intensity,
      });
      console.log(this.activity);

      // TODO replace with actual activity id
      this.activityService.editActivity('-Lx_t1Ch4v1h7sox96XZ', record).then(
          res => console.log(res),
          err => console.log(err)
      );
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
