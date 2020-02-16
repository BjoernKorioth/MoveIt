import {Component, OnInit} from '@angular/core';
import {GoalService} from '../../services/goal/goal.service';
import {Location} from '@angular/common';

import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {TrackingService} from '../../services/tracking/tracking.service';

@Component({
    selector: 'app-goals-detail',
    templateUrl: './goals-detail.page.html',
    styleUrls: ['./goals-detail.page.scss'],
})
export class GoalsDetailPage implements OnInit {
    speed = 0;

    goal: any;

    constructor(private goalService: GoalService, private location: Location, private router: Router,
                private alertController: AlertController, private trackingService: TrackingService) {
        this.goal = this.router.getCurrentNavigation().extras.state.goal; // TODO: display error message if empty

        // this.goals = this.goalService.getGoals();
        this.router = router;
    }

    ngOnInit() {
        console.log(this.router.getCurrentNavigation().extras.state);
    }

    goBack() {
        this.location.back();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Success',
            message: 'Were the previous goal too easy?',
            buttons: [
                {
                    text: 'YES', handler: () => {
                        this.trackingService.logReaction('goal-adjustment-too-easy', 'yes');
                    }
                },
                {
                    text: 'No', handler: () => {
                        this.trackingService.logReaction('goal-adjustment-too-easy', 'yes');
                    }
                }
            ],
        });

        await alert.present();
        const result = await alert.onDidDismiss();
        console.log(result);
    }

    editGoal() {
        this.goalService.adjustGoal(this.goal, this.goal.target).then(
            res => {
                console.log(res);
                this.presentAlert();
                this.router.navigateByUrl('/menu/progress');
            },
            err => console.log(err)
        );


        /*moderate(){
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
          );*/
    }
}
