import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../services/activity/activity.service';
import {Activity} from '../../model/activity';
import {Observable} from 'rxjs';
import {GoalService} from '../../services/goal/goal.service';
import {Goal} from '../../model/goal';
import {Location} from '@angular/common';
import { Health } from '@ionic-native/health/ngx';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-progress-detail',
    templateUrl: './progress-detail.page.html',
    styleUrls: ['./progress-detail.page.scss'],
})
export class ProgressDetailPage implements OnInit {
    activities: Observable<Activity[]>;
    goals: Observable<any>;
    goalStorage: Array<Goal>;

    constructor(private activityService: ActivityService, private goalService: GoalService, private location: Location, private health: Health, private platform: Platform) {
        this.activities = this.activityService.getAllUserActivities();
        this.activities.subscribe(activities => this.updateGoals(activities));
        this.goals = this.goalService.getGoals();
        this.goals.subscribe(goals => this.goalStorage = goals);
    }

    ngOnInit() {
        this.checkPlatformReady();
    }

    async checkPlatformReady() {
        const ready = !!await this.platform.ready();
        if (ready) {
            this.health.isAvailable()
            .then((available:boolean) => {
              console.log(available);
              this.health.requestAuthorization([
                'distance', 'nutrition',  //read and write permissions
                {
                  read: ['steps'],       //read only permission
                  write: ['height', 'weight']  //write only permission
                }
              ])
              .then(res => {console.log(res);     
              this.loadHealthData();
              }

              )
              .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
        }
        }

        saveWorkout() {
            this.health.store({
                startDate:  new Date(new Date().getTime() - 3 * 60 * 1000), // three minutes ago
                endDate: new Date(),
                dataType: 'steps',
                value: '180',
                sourceName: 'MoveIt_test',
                sourceBundleId: 'com.example.MoveIt_test'
            }).then(res => console.log(res))
            .catch(e => console.log(e));
          }

          loadHealthData() {

            this.health.query({
                startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
                endDate: new Date(), // now
                dataType: 'steps'
              }).then(res => console.log(res))
              .catch(e => console.log(e));  
        }
        
         

    goBack() {
        this.location.back();
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

    /**
     * For testing purposes only: Create all default goals for a user
     */
    createGoals() {
        return this.goalService.initializeUserGoals();
    }

    /**
     * Adjusts the target of a goal
     */
    adjustGoal() {
        // Get the goal given a name
        this.goalService.getGoal('dailyModerate').then(
            // If the goal exists, adjust the goal
            goal => this.goalService.adjustGoal(goal, 90).then(
                res => console.log(res), // Goal successfully adjusted
                err => console.log(err) // Goal adjustment failed
            ),
            err => console.log(err) // Fetching the goal failed
        );
    }

    updateGoals(activities) {
        console.log(this.goalStorage);
        this.goalService.updateGoals(this.goalStorage, activities).then(
            res => console.log(res),
            err => console.log(err)
        );
    }
}

