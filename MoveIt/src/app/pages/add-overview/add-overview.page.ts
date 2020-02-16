import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivityService} from '../../services/activity/activity.service';

@Component({
    selector: 'app-add-overview',
    templateUrl: './add-overview.page.html',
    styleUrls: ['./add-overview.page.scss'],
})
export class AddOverviewPage implements OnInit {
    lastDate: Date;

    constructor(private location: Location, private activityService: ActivityService) {
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
          res => console.log(res),
          err => console.log(err)
      );
    }
}
