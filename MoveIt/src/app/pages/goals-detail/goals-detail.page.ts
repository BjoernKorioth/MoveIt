import { Component, OnInit } from '@angular/core';
import {GoalService} from '../../services/goal/goal.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-goals-detail',
  templateUrl: './goals-detail.page.html',
  styleUrls: ['./goals-detail.page.scss'],
})
export class GoalsDetailPage implements OnInit {

  goals:any;

  constructor(private goalService: GoalService, private location: Location) {
    this.goals = this.goalService.getGoals();
    
  }

  ngOnInit() {
  }
  
  goBack() {
    this.location.back();
}

  moderate(){
    this.goalService.getGoal('dailyModerate').then(
      res => {
          document.getElementById("daily").setAttribute("value",res.target);
          document.getElementById("daily").setAttribute("name","dailyModerate");
      },
      err => console.log(err)
    );

    this.goalService.getGoal('weeklyModerate').then(
      res => {
          document.getElementById("weekly").setAttribute("value",res.target);
          document.getElementById("weekly").setAttribute("name","weeklyModerate");
      },
      err => console.log(err)
    );
  }

  vigorous(){
    this.goalService.getGoal('dailyVigorous').then(
      res => {
        document.getElementById("daily").setAttribute("value",res.target);
        document.getElementById("daily").setAttribute("name","dailyVigorous");
      },
      err => console.log(err)
    );

    this.goalService.getGoal('weeklyVigorous').then(
      res => {
          document.getElementById("weekly").setAttribute("value",res.target);
          document.getElementById("weekly").setAttribute("name","weeklyVigorous");
      },
      err => console.log(err)
    );
  }

  weight(){
    this.goalService.getGoal('dailyWeight').then(
      res => {
          document.getElementById("daily").setAttribute("value",res.target);
          document.getElementById("daily").setAttribute("name","dailyWeight");
      },
      err => console.log(err)
    );

    this.goalService.getGoal('weeklyWeight').then(
      res => {
          document.getElementById("weekly").setAttribute("value",res.target);
          document.getElementById("weekly").setAttribute("name","weeklyWeight");
      },
      err => console.log(err)
    );
  }

  adjustGoal(){
    var changedDaily = document.getElementById("daily").getAttribute("name");
    var changedWeekly = document.getElementById("weekly").getAttribute("name");

    this.goalService.getGoal(changedDaily).then(
      res => {
        this.goalService.adjustGoal(res,Number(document.getElementsByTagName("input")[0].value));
        console.log(document.getElementsByTagName("input")[0].value);
      },
      err => console.log(err)
    );

    this.goalService.getGoal(changedWeekly).then(
      res => {
        this.goalService.adjustGoal(res,Number(document.getElementsByTagName("input")[1].value));
        console.log(document.getElementsByTagName("input")[1].value);
      },
      err => console.log(err)
    );
  }

}
