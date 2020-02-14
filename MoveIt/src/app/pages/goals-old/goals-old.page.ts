import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoalService } from 'src/app/services/goal/goal.service';
import { Goal } from 'src/app/model/goal';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { Activity } from 'src/app/model/activity';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-goals-old',
  templateUrl: './goals-old.page.html',
  styleUrls: ['./goals-old.page.scss'],
})
export class GoalsOldPage implements OnInit {
  wonGoals : any;
  wonGoalsName: any;
  allInfo: any[] = [];
  goals: Array<Goal>;
  lastGoalM: number = 0;
  lastGoalV: number = 0;
  lastGoalW: number = 0;
  activities: Array<Activity>;
  relative: number;
  wholeDuration: any[];
  relativeV: number;
  relativeW: number;

  oldGoals: any[] = [];

  constructor(private goalService: GoalService, private activityService: ActivityService) {
    let that = this;
    console.log(new Date(1578051105399));
    this.allInfo = that.allInfo;
    let latestGoalTimeM: number = 0;
    let latestGoalTimeV: number = 0; 
    let latestGoalTimeW: number = 0;  

    this.goalService.getGoals().subscribe(data => {
      this.goals = data;

      
    this.goals.forEach(function (goal) {

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

 for (let weekNumber = 0; weekNumber < 4; weekNumber++) {
  let lastSunday = new Date();
  lastSunday.setDate(lastSunday.getDate() - (7 * weekNumber) - lastSunday.getDay());


   latestGoalTimeW = 0;
   latestGoalTimeV = 0;
   latestGoalTimeM = 0;
   that.lastGoalM = 0;
   that.lastGoalV = 0;
   that.lastGoalW = 0;
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
    oldGoalM.name = "weekly moderate " + weekNumber;
    oldGoalM.weekNumber = weekNumber;
    oldGoalM.intensity = "moderate"
    oldGoalM.weekGoal = that.lastGoalM;
    that.oldGoals.push(oldGoalM);

    oldGoalV.name = "weekly vigorous " + weekNumber;
    oldGoalV.weekNumber = weekNumber;
    oldGoalV.intensity = "vigorous"
    oldGoalV.weekGoal = that.lastGoalV;
    that.oldGoals.push(oldGoalV);

    oldGoalW.name = "weekly weight training " + weekNumber;
    oldGoalW.weekNumber = weekNumber;
    oldGoalW.intensity = "weightTraining"
    oldGoalW.weekGoal = that.lastGoalW;
    that.oldGoals.push(oldGoalW);

    console.log(that.oldGoals);
  };

    });
    this.activitiesFromLastWeek();

   }

   

  ngOnInit() {

  }

  activitiesFromLastWeek(){
    let that = this;
    //let today: Date = new Date();
    //let today2: Date = new Date();
  //  let day: number = today.getDay();
  //  let lastSunday2: Date = new Date(today.setDate(today.getDate() - day));
   // let lastSecSunday: Date = new Date(today2.setDate(today2.getDate() - day - 7));
    let lastWekkActivities = [];

    this.activityService.getAllUserActivities().subscribe( data =>{
      console.log(data);

     // console.log(lastSecSunday);
 //     let wholeDuration = [];
    for (let weekNumber = 0; weekNumber < 4; weekNumber++) {
      this.activities = [];
      lastWekkActivities = [];
      let lastSunday = new Date();
      let lastSecSunday = new Date();
      lastSunday.setDate(lastSunday.getDate() - (7 * weekNumber) - lastSunday.getDay());
      lastSecSunday.setDate(lastSecSunday.getDate() - (7 * weekNumber ) - lastSecSunday.getDay() - 7);


      lastWekkActivities.push(data.filter(function (activity){
        return activity.startTime.getTime() < lastSunday.getTime() && activity.startTime.getTime() > lastSecSunday.getTime();
      }));
      this.activities = lastWekkActivities;
      console.log(this.activities);

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
      if(goal.intensity == "weightTraining" && goal.weekNumber == weekNumber){
        goal.duration = weight;
        goal.relative = goal.duration / goal.weekGoal;
      }

    });
    console.log(this.oldGoals);



    this.relative = moderate / that.lastGoalM;
    this.relativeV = vigorous / that.lastGoalV;
    this.relativeW = weight / that.lastGoalW;

  }
  })


  }

}
