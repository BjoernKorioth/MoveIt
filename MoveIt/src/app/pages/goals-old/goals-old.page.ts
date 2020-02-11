import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoalService } from 'src/app/services/goal/goal.service';
import { Goal } from 'src/app/model/goal';

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

  constructor(private goalService: GoalService) {
    let that = this;
    this.goalService.getGoals().subscribe(data => {
      this.goals = data;
      console.log(this.goals);
      
    this.goals.forEach(function (goal) {

      goal.history.forEach(function (history){
        for (var hist in history){
          if (history.hasOwnProperty(hist)){ 
            console.log(hist);
            console.log(history);

            history = {
              name: goal.name,
              val: history[hist],
              newTarget: hist
            }
            that.allInfo.push(history);
            console.log(that.allInfo);
          }

        }
      })
    });

    });



   }

  ngOnInit() {
  }

}
