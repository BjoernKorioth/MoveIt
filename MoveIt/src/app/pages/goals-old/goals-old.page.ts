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
  lastGoalM: number;
  lastGoalV: number;
  lastGoalW: number;
  activities: Array<Activity>;
  relative: number;
  wholeDuration: any[];
  relativeV: number;
  relativeW: number;

  constructor(private goalService: GoalService, private activityService: ActivityService) {
    let that = this;
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

    this.allInfo = that.allInfo;
    let latestGoalTimeM: number = 0;
    let latestGoalTimeV: number = 0; 
    let latestGoalTimeW: number = 0;  
    let today: Date = new Date();
    let day: number = today.getDay();
    let lastSunday: Date = new Date();//any = today.setDate(today.getDate() - day);
    //let lastWeekSunday = new Date(lastSunday);
    console.log(lastSunday);
    console.log(this.allInfo);
    
    this.allInfo.forEach(function(changedGoal) {
      
      for (let weekNumber = 0; weekNumber < 5; weekNumber++) {
        lastSunday.setDate(today.getDate() - day - weekNumber);
      
 

      if(changedGoal.time < lastSunday){
      //  console.log(changedGoal.val);
        console.log(changedGoal.time);

        if (changedGoal.time > latestGoalTimeM && changedGoal.name == "weeklyModerate"){
          latestGoalTimeM = changedGoal.time;
          that.lastGoalM = changedGoal.val;
          }
        
        if (changedGoal.time > latestGoalTimeV && changedGoal.name == "weeklyVigorous"){
          latestGoalTimeV = changedGoal.time;
          that.lastGoalV = changedGoal.val;
          }
        

        if (changedGoal.time > latestGoalTimeV && changedGoal.name == "weeklyWeight"){
          latestGoalTimeW = changedGoal.time;
          that.lastGoalW = changedGoal.val;
          } 
        }     
      if(that.lastGoalV == null) {
        that.lastGoalV = 600;
      }if(that.lastGoalW == null) {
        that.lastGoalW = 600;
      }if(that.lastGoalM == null) {
        that.lastGoalM = 600;
      }

    };
    });
    console.log(that.lastGoalM);
    });

    this.activitiesFromLastWeek();
   }

   

  ngOnInit() {

  }

  activitiesFromLastWeek(){
    let that = this;

    this.activityService.getAllUserActivities().subscribe( data =>{
      let today: Date = new Date();
      let today2: Date = new Date();
      let day: number = today.getDay();
      let lastSunday: Date = new Date(today.setDate(today.getDate() - day));
      let lastSecSunday: Date = new Date(today2.setDate(today2.getDate() - day - 7));
      let lastWekkActivities = [];
      console.log(lastSecSunday);
 //     let wholeDuration = [];


      lastWekkActivities.push(data.filter(function (activity){
        return activity.startTime.getDate() < lastSunday.getDate() && activity.startTime.getDate() > lastSecSunday.getDate();
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
    this.relative = moderate / that.lastGoalM;
    this.relativeV = vigorous / that.lastGoalV;
    this.relativeW = weight / that.lastGoalW;
    console.log(weight);
    console.log(that.lastGoalW);
    console.log(this.relativeW);

  })

  }

}
