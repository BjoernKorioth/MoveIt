import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from '../../services/activity/activity.service';
import { Activity } from '../../model/activity';
import { merge, Observable, of } from 'rxjs';
import { GoalService } from '../../services/goal/goal.service';
import { Goal } from '../../model/goal';
import { Location } from '@angular/common';
import { Health } from '@ionic-native/health/ngx';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { first, map, last } from 'rxjs/operators';
import { IonSlides } from '@ionic/angular';

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
    duration = 'day';

    weeklyActivities;
    public chartLabels: any = [];
    public chartValuesModerate: any = [];
    public chartValuesVigorous: any = [];
    public chartValuesWeight: any = [];
    public chartColours: any = [];
    public chartHoverColours: any = [];

   
      @ViewChild('slides', { static: false }) slides: IonSlides;
    @ViewChild('barChart', { static: false }) barChart: { nativeElement: any; };
    @ViewChild('hrzBarChart5', { static: false }) hrzBarChart5: { nativeElement: any; };
    @ViewChild('weeklyChart', { static: false }) weeklyChart: { nativeElement: any; }; 

    // barChart: any;

    hrzBars5: any;
    weeklyBarChart: any;
    dailyActivities: any[];
    public chartLabelsWeekly: any = [];

    slideOpts = {
        initialSlide: 4
      };
      wonGoals : any;
      wonGoalsName: any;
      allInfo: any[] = [];
      goalsHistory: Array<Goal>;
      lastGoalM: number = 0;
      lastGoalV: number = 0;
      lastGoalW: number = 0;
      activitiesGoals: Array<Activity>;
      relative: number;
      wholeDuration: any[];
      relativeV: number;
      relativeW: number;
    
      oldGoals: any[] = [];


    constructor(private activityService: ActivityService, private goalService: GoalService, private location: Location,
        private health: Health, private platform: Platform, private router: Router, private navCtrl: NavController) {
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
        this.goals.subscribe(goals => {
            this.goalStorage = goals;
            console.log(this.goalStorage);
        });
        this.goals.pipe(first()).subscribe(goals => {
            this.activities.pipe(first()).subscribe(activities => {
                this.goalService.updateGoals(goals, activities);
            });
        });
        this.defineChartDataDaily();
        this.loadOldGoals();
    }

    ionViewDidEnter() {
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

    //daily
    defineChartDataDaily() {
        let that = this;
        let now = new Date();
        let lastWeek: Date = new Date();
        // lastWeek.setDate(lastWeek.getDate() - 7);

        this.activities.subscribe(activities => {
            // Daten für die Woche
            let dailyActivities = [];
            this.chartLabels = [];

            for (let hour = 0; hour < 24; hour++) {
                //  lastWeek.setDate(now.getDate() - dayOfWeek);
                dailyActivities.push(activities.filter(function (activity) {
                    return activity.startTime.getDate() == now.getDate() && activity.startTime.getHours() == hour
                }));


                that.chartLabels.push(
                    hour
                );
            }

            const intensities = [
                { id: 'vigorous', name: 'vigorous' },
                { id: 'moderate', name: 'moderate' },
                { id: 'weightTraining', name: 'weight training' }
            ];

            let dailyActivitiesDurations = [];
            dailyActivities.forEach(function (weekly) {
                let obj = {
                    vigorous: [],
                    moderate: [],
                    weightTraining: []
                };
                intensities.forEach(function (intensity) {
                    obj[intensity.id] = weekly
                        .filter((activity) => activity.intensity === intensity.name)
                        .reduce(((totalDuration, activity) => totalDuration + activity.getDuration()), 0);
                });

                dailyActivitiesDurations.push(obj);


                /*let weeklyActivities = activities.filter(function(activity){
                    return activity.startTime.getDate() >= lastWeek.getDate();
                   /* getFullYear() == now.getFullYear() && 
                    activity.startTime.getMonth()           == now.getMonth()    &&
                    activity.startTime.getDay()             == now.getDay();
                    //activity.intensity                      == 'moderate';*/
            });
            this.dailyActivities = dailyActivitiesDurations;

            that.createHrzBarChart5Daily();
        })
    }

    //weekly
    defineChartData() {
        let that = this;
        let now = new Date();
        let lastWeek: Date = new Date();
        // lastWeek.setDate(lastWeek.getDate() - 7);

        this.activities.subscribe(activities => {
            this.chartLabelsWeekly = [];
            // Daten für die Woche
            let weeklyActivities = [];

            for (let dayOfWeek = 6; dayOfWeek >= 0; dayOfWeek--) {
                lastWeek.setDate(now.getDate() - dayOfWeek);
                weeklyActivities.push(activities.filter(function (activity) {
                    return activity.startTime.getDate() == lastWeek.getDate();
                }));

                let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

                that.chartLabelsWeekly.push(
                    days[ lastWeek.getDay()]
                );
            }

            const intensities = [
                { id: 'vigorous', name: 'vigorous' },
                { id: 'moderate', name: 'moderate' },
                { id: 'weightTraining', name: 'weight training' }
            ];

            let weeklyActivityDurations = [];
            weeklyActivities.forEach(function (weekly) {
                let obj = {
                    vigorous: [],
                    moderate: [],
                    weightTraining: []
                };
                intensities.forEach(function (intensity) {
                    obj[intensity.id] = weekly
                        .filter((activity) => activity.intensity === intensity.name)
                        .reduce(((totalDuration, activity) => totalDuration + activity.getDuration()), 0);
                });

                weeklyActivityDurations.push(obj);
            });
            this.weeklyActivities = weeklyActivityDurations;

            that.createWeeklyChart();
        })
    }


    createHrzBarChart5Daily() {
        if(this.hrzBars5) {
            this.hrzBars5.destroy();            
        }

        let ctx = this.hrzBarChart5.nativeElement;
        // ctx.height = 400;
   
        this.hrzBars5 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.chartLabels,
                datasets: [{
                    label: 'moderate',
                    data: this.dailyActivities.map((intensity) => intensity.moderate),
                    backgroundColor: '#F61067', // array should have same number of elements as number of dataset
                    borderColor: '#F61067',// array should have same number of elements as number of dataset
                    borderWidth: 1
                },
                {
                    label: 'vigorous',
                    data: this.dailyActivities.map((intensity) => intensity.vigorous),
                    backgroundColor: '#6DECAF', // array should have same number of elements as number of dataset
                    borderColor: '#6DECAF',// array should have same number of elements as number of dataset
                    borderWidth: 1
                },
                {
                    label: 'weight training',
                    data: this.dailyActivities.map((intensity) => intensity.weightTraining),
                    backgroundColor: '#656866', // array should have same number of elements as number of dataset
                    borderColor: '#656866',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{      
                        scaleLabel: {
                        display: true,
                        labelString: 'Hour'
                      },
                        /*type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD'
                            }
                        },*/
                        barPercentage: 0.9,
                        gridLines: {
                            display: false
                        },
                        stacked: true
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Minutes'
                          },
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: true
                    }]
                }
            }
        });
    }


    createWeeklyChart() {   
    
        if(this.weeklyBarChart) {
            this.weeklyBarChart.destroy();            
        }

        let ctx = this.weeklyChart.nativeElement
        // ctx.height = 400;

        this.weeklyBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.chartLabelsWeekly,
                datasets: [{
                    label: 'moderate',
                    data: this.weeklyActivities.map((intensity) => intensity.moderate),
                    backgroundColor: '#F61067', // array should have same number of elements as number of dataset
                    borderColor: '#F61067',// array should have same number of elements as number of dataset
                    borderWidth: 1
                },
                {
                    label: 'vigorous',
                    data: this.weeklyActivities.map((intensity) => intensity.vigorous),
                    backgroundColor: '#6DECAF', // array should have same number of elements as number of dataset
                    borderColor: '#6DECAF',// array should have same number of elements as number of dataset
                    borderWidth: 1
                },
                {
                    label: 'weight training',
                    data: this.weeklyActivities.map((intensity) => intensity.weightTraining),
                    backgroundColor: '#656866', // array should have same number of elements as number of dataset
                    borderColor: '#656866',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                          },
                        /*type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD'
                            }
                        },*/
                        barPercentage: 0.9,
                        gridLines: {
                            display: false
                        },
                        stacked: true
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Minutes'
                          },
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: true
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

    
  goToOldGoalsPage() {
    this.navCtrl.navigateForward('/menu/progress/progress/goals-old');
}

loadOldGoals(){
    let that = this;
    this.allInfo = that.allInfo;
    let latestGoalTimeM: number = 0;
    let latestGoalTimeV: number = 0; 
    let latestGoalTimeW: number = 0;  

    this.goalService.getGoals().subscribe(data => {
      this.goalsHistory = data;

      
    this.goalsHistory.forEach(function (goal) {

      goal.history.forEach(function (history){
        for (var hist in history){
          if (history.hasOwnProperty(hist)){ 
        
            let obj = {
              name: goal.name,
              val: history[hist],
              time: hist
            }
            that.allInfo.push(obj);
          }
        }
      })
    });

 for (let weekNumber = 3; weekNumber >= 0; weekNumber--) {
  let lastSunday = new Date();
  lastSunday.setDate(lastSunday.getDate() - (7 * weekNumber) - lastSunday.getDay());
  lastSunday.setHours(0,0,0,0);


   latestGoalTimeW = 0;
   latestGoalTimeV = 0;
   latestGoalTimeM = 0;
   that.lastGoalM = 0;
   that.lastGoalV = 0;
   that.lastGoalW = 0;
   console.log(this.allInfo);
    this.allInfo.forEach(function(changedGoal) {
      
      if(changedGoal.time < lastSunday.getTime()){
      //  console.log(changedGoal.val);


        if (changedGoal.time > latestGoalTimeM && changedGoal.name == "weeklyModerate"){
          latestGoalTimeM = changedGoal.time;
          that.lastGoalM = changedGoal.val;

          }
        
        if (changedGoal.time > latestGoalTimeV && changedGoal.name == "weeklyVigorous"){
          latestGoalTimeV = changedGoal.time;
          that.lastGoalV = changedGoal.val;
          }
        

        if (changedGoal.time > latestGoalTimeW && changedGoal.name == "weeklyWeight"){
          latestGoalTimeW = changedGoal.time;
          that.lastGoalW = changedGoal.val;
          } 
        }     
      if(that.lastGoalV == 0) {
        that.lastGoalV = 600;
      }if(that.lastGoalW == 0) {
        that.lastGoalW = 600;
      }if(that.lastGoalM == 0) {
        that.lastGoalM = 600;
      }
    });

    if(this.allInfo.length == 0){
        if(that.lastGoalV == 0) {
            that.lastGoalV = 600;
          }if(that.lastGoalW == 0) {
            that.lastGoalW = 600;
          }if(that.lastGoalM == 0) {
            that.lastGoalM = 600;
          }
    }


    let oldGoalM:any = {
      name: '',
      intensiy: '',
      weekNumber: 0,
      weekGoal: 0,
      duration: 0,
      relative: 0
    }
    let oldGoalV:any = {
      name: '',
      intensiy: '',
      weekNumber: 0,
      weekGoal: 0,
      duration: 0,
      relative: 0
    }
    let oldGoalW:any = {
      name: '',
      intensiy: '',
      weekNumber: 0,
      weekGoal: 0,
      duration: 0,
      relative: 0
    }
    oldGoalM.name = "weekly " + (weekNumber+1) + " ago";
    oldGoalM.weekNumber = weekNumber;
    oldGoalM.intensity = "moderate"
    oldGoalM.weekGoal = that.lastGoalM;
    that.oldGoals.push(oldGoalM);

    oldGoalV.name =  "weekly " + (weekNumber+1) + " ago";
    oldGoalV.weekNumber = weekNumber;
    oldGoalV.intensity = "vigorous"
    oldGoalV.weekGoal = that.lastGoalV;
    that.oldGoals.push(oldGoalV);

    oldGoalW.name =  "weekly " + (weekNumber+1) + " ago";
    oldGoalW.weekNumber = weekNumber;
    oldGoalW.intensity = "weight training"
    oldGoalW.weekGoal = that.lastGoalW;
    that.oldGoals.push(oldGoalW);

    console.log(that.oldGoals);
  };

    });
    this.activitiesFromLastWeek();
}

activitiesFromLastWeek(){
    let that = this;
    let lastWekkActivities = [];

    this.activityService.getAllUserActivities().subscribe( data =>{
      console.log(data);
    for (let weekNumber = 3; weekNumber >= 0; weekNumber--) {
      this.activitiesGoals = [];
      lastWekkActivities = [];
      let lastSunday = new Date();
      let lastSecSunday = new Date();
      lastSunday.setDate(lastSunday.getDate() - (7 * weekNumber) - lastSunday.getDay());
      lastSunday.setHours(0,0,0,0);
      lastSecSunday.setDate(lastSecSunday.getDate() - (7 * weekNumber ) - lastSecSunday.getDay() - 7);
      lastSecSunday.setHours(0,0,0,0);

      lastWekkActivities.push(data.filter(function (activity){
        return activity.startTime.getTime() < lastSunday.getTime() && activity.startTime.getTime() > lastSecSunday.getTime();
      }));
      this.activitiesGoals = lastWekkActivities;

      const intensities = [
        { id: 'vigorous', name: 'vigorous' },
        { id: 'moderate', name: 'moderate' },
        { id: 'weightTraining', name: 'weight training' }
    ];

    let weeklyActivityDurations = [];
    lastWekkActivities.forEach(function (weekly) {
        let obj = {
            vigorous: [],
            moderate: [],
            weightTraining: []
        };
        intensities.forEach(function (intensity) {
            obj[intensity.id] = weekly
                .filter((activity) => activity.intensity === intensity.name)
                .reduce(((totalDuration, activity) => totalDuration + activity.getDuration()), 0);
        });

        weeklyActivityDurations.push(obj);
    });
    this.wholeDuration = weeklyActivityDurations;
    let moderate: any;
    let vigorous: any;
    let weight: any;
    moderate = this.wholeDuration.map((intensity) => intensity.moderate);
    vigorous = this.wholeDuration.map((intensity) => intensity.vigorous);
    weight = this.wholeDuration.map((intensity) => intensity.weightTraining);
    console.log(weight);

    this.oldGoals.forEach( function(goal){
      if(goal.intensity == "moderate" && goal.weekNumber == weekNumber){
        goal.duration = moderate;
        goal.relative = goal.duration / goal.weekGoal;
      }
      if(goal.intensity == "vigorous" && goal.weekNumber == weekNumber){
        goal.duration = vigorous;
        goal.relative = goal.duration / goal.weekGoal;
      }
      if(goal.intensity == "weight training" && goal.weekNumber == weekNumber){
        goal.duration = weight;
        goal.relative = goal.duration / goal.weekGoal;
      }

    });
    console.log(this.oldGoals);

  }
  })
}

slidePrev(){
    this.slides.slidePrev();
}
slideNext(){
    this.slides.slideNext();
}

}

