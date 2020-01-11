import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../services/activity/activity.service';
import {Activity} from '../../model/activity';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-progress-detail',
    templateUrl: './progress-detail.page.html',
    styleUrls: ['./progress-detail.page.scss'],
})
export class ProgressDetailPage implements OnInit {
    activities: Observable<Activity[]>;
    goals: any;

    constructor(private activityService: ActivityService) {
        this.activities = this.activityService.getAllUserActivities();

        this.goals = [
            {
              name: 'Goal 1',
              type: 'vigorous',
              value: '0.4'
            },
            {
              name: 'Goal 2',
              type: 'moderate',
              value:'0.6'
            },
            {
              name: 'Goal 3',
              type: 'weight training',
              value: '0.8'
            }
        ]
    }

    ngOnInit() {
    }

    /**
     * Create a new activity
     *
     * An activity object must be present in order to do so. This must be created from the user input
     */
    createActivity() {
        // TODO replace with actual activity object
        this.activityService.createActivity(new Activity()).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    /**
     * Update an existing id
     *
     * An updated activity object and the id of the activity to be updated must be provided
     */
    editActivity() {
        const record = new Activity('-Lx_t1Ch4v1h7sox96XZ', {unit: 'km', value: 42.2});

        // TODO replace with actual activity id
        this.activityService.editActivity('-Lx_t1Ch4v1h7sox96XZ', record).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    /**
     * Retrieve an activity giving its id
     */
    getActivity() {
        // TODO replace with actual activity id
        this.activityService.getActivity('-Lx_t1Ch4v1h7sox96XZ').then(
            res => {
                console.log(res);
            },
            err => console.log(err)
        );
    }

    /**
     * Retrieves an array of all activities of a current user
     */
    getAllActivities() {
        return this.activityService.getAllUserActivities();
    }
}
