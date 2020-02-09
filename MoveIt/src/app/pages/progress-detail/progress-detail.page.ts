import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivityService} from '../../services/activity/activity.service';
import {Activity} from '../../model/activity';
import {merge, Observable, of} from 'rxjs';
import {GoalService} from '../../services/goal/goal.service';
import {Goal} from '../../model/goal';
import {Location} from '@angular/common';
import {Health} from '@ionic-native/health/ngx';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';
import {first, map} from 'rxjs/operators';


@Component({
    selector: 'app-progress-detail',
    templateUrl: './progress-detail.page.html',
    styleUrls: ['./progress-detail.page.scss'],
})
export class ProgressDetailPage implements OnInit {
    activities: Observable<Activity[]>;
    // Array which contains the displayed activities
    displayedActivities: Observable<Activity[]>;
    goals: Observable<any>;
    goalStorage: Array<Goal>;
    public chartLabels               : any    = [];
    public chartValues               : any    = []; 
    public chartColours              : any    = [];
    public chartHoverColours         : any    = [];

    @ViewChild('barChart', {static: false}) barChart: { nativeElement: any; };
   // barChart: any;


    constructor(private activityService: ActivityService, private goalService: GoalService, private location: Location,
        private health: Health, private platform: Platform, private router: Router) {
        this.activities = this.activityService.getAllUserActivities();

        this.displayedActivities = this.activities.pipe(map(
            (data) => {
               // data.sort((a, b) => {
                 //   return b.startTime.getTime() - a.startTime.getTime();
                //});
                return data.slice(0, 5);
            }
        ));

        this.goals = this.goalService.getGoals();
        this.goals.subscribe(goals => this.goalStorage = goals);
        this.goals.pipe(first()).subscribe(goals => {
            this.activities.pipe(first()).subscribe(activities => {
                this.goalService.updateGoals(goals, activities);
            });
        });
    }


    loadMoreActivities() {
        let currentlyDisplayed = 0;
        this.displayedActivities.subscribe(
            c => currentlyDisplayed = c.length
        );

        const newDisplayedActivities = this.activities.pipe(
            map(data => data.slice(0, currentlyDisplayed + 5))
        );

        this.displayedActivities = merge(
            this.displayedActivities,
            newDisplayedActivities
        );
    }


    ionViewDidEnter() {
        
        this.defineChartData();
    }

    defineChartData(){
        let that = this;
        let now = new Date();
        this.activities.subscribe(activities => {
            let todayActivities = activities.filter(function(activity){
                return activity.startTime.getFullYear() == now.getFullYear() && 
                activity.startTime.getMonth()           == now.getMonth()    &&
                activity.startTime.getDay()             == now.getDay();
            })
            todayActivities.forEach(function(activity){
                console.log(activity);

                that.chartValues.push({
                    x: activity.startTime, 
                    y: activity.getDuration()
                });
                //that.chartLabels.push(activity.startTime.getHours());
                //that.chartValues.push(activity.getDuration());
            
            });
            that.createSimpleLineChart();
    })

           // this.chartLabels.push(active.intensity);
          //  this.chartValues.push(active.type);
          //  this.chartColours.push(tech.color);
       
       }   //  this.chartHoverColours.push(tech.hover);
    


    createSimpleLineChart() {
        
        console.log(this.chartValues);
       // console.log(this.chartLabels);

        this.barChart = new Chart(this.barChart.nativeElement, {
            type: 'bar',       
            data: {
               // labels: this.chartValues.x,
               
                datasets: [{
                    label: 'Active Minutes',
                    data: this.chartValues,
                    backgroundColor: 'rgba(38, 194, 129, .7)',
                    borderColor: 'rgb(38, 194, 129)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                      //  display: true,
                      //  beginAtZero: true,
                      ticks: {
                        beginAtZero: true,
                        min: 0
                    },
                        gridLines: {
                            display: false
                        },
                        bounds: 'ticks',

                        type: 'time',
                        time: {
                            unit: 'hour',
                            
                            unitStepSize: 6,
                            displayFormats: {
                                hour: 'HH'
                            }
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }


    ngOnInit() {
        this.checkPlatformReady();
    }

    async checkPlatformReady() {
        const ready = !!await this.platform.ready();
        if (ready) {
            this.health.isAvailable()
                .then((available: boolean) => {
                    console.log('HEALTH IS AVAILABLE :' + available);
                    this.health.requestAuthorization([
                        /* 'distance', 'nutrition', //read and write permissions
                        {
                            read: ['steps'], //read only permission
                            write: ['height', 'weight'] //write only permission
                        } */
                        'activity'
                    ]).then(res => {
                            console.log(res);
                            this.loadHealthData();
                        }
                    ).catch(e => console.log(e));
                })
                .catch(e => console.log(e));
        }
    }

   
    saveWorkout() {
         /*
        this.health.requestAuthorization([
            
            'activity'
        ])
            .then(
                res => console.log(res))
            .catch(e => console.log(e));
        this.health.store({
            startDate: new Date(new Date().getTime() - 3 * 60 * 1000), // three minutes ago
            endDate: new Date(),
            dataType: 'activity',
            value: 'walking',
            sourceName: 'MoveIt_test',
            sourceBundleId: 'com.moveitproject.www'
        }).then(res => console.log('Response of API while writing' + res))
            .catch(e => console.log('Response of API while writing ERROR:' + e));
            */
           var activity = new Activity();
           activity.endTime = new Date();
           activity.startTime = new Date(new Date().getTime() - 3 * 60 * 1000), // three minutes ago

           this.activityService.writeFitnessApi(activity);
    } 

    loadHealthData() {

        /* this.health.requestAuthorization([
            'activity'
        ])
            .then(
                res => console.log(res))
            .catch(e => console.log(e));
        this.health.query({
            startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
            endDate: new Date(), // now
            dataType: 'activity',
        }).then((value: []) => {
            console.log('Value of Health Dataloaded:', value);
            // console.log('Before For loop');
            // tslint:disable-next-line: forin
            // for (const val in value) {
            // console.log('HealthData data' + JSON.stringify(value[val].value));
            // console.log('HealthData data' + JSON.stringify(value[val]));
            // }
        }).catch((e: any) => {
            console.error('HealthData ERROR:---' + e);
        }); */
        //var startDate = new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000); // three days ago
        //var endDate = new Date(); // now
        var acts = this.activityService.readFitnessApi();
        console.log('ConvertedData: ' + acts);

    }


    goBack() {
        this.location.back();
    }

    routeToEditGoalPage(goal: Goal) {
        this.router.navigateByUrl('/menu/goals/goals/detail', { state: { goal } });
    }

    routeToEditPage(activity: Activity) {
        this.router.navigateByUrl('/menu/progress/progress/edit', { state: { activity } });
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
        const record = new Activity('-Lx_t1Ch4v1h7sox96XZ', { unit: 'km', value: 42.2 });

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
}

