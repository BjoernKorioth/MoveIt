import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {ChallengeService} from '../../services/challenges/challenge.service';
import {RewardsService} from '../../services/rewards/rewards.service';
import {Trophy} from '../../model/trophy';
import {ActivityService} from '../../services/activity/activity.service';
import {GoalService} from '../../services/goal/goal.service';
import {Activity} from '../../model/activity';
import {PopoverController} from '@ionic/angular';
import {TrophyPopover} from 'src/app/trophy-popover/trophy-popover.component';
import {ViewLog} from '../../model/viewLog';
import {TrackingService} from '../../services/tracking/tracking.service';


@Component({
    selector: 'app-rewards-trophies',
    templateUrl: './rewards-trophies.page.html',
    styleUrls: ['./rewards-trophies.page.scss'],
})
export class RewardsTrophiesPage implements OnInit, OnDestroy {
    trophies: any;
    inactTrophies: any;
    activities: Array<Activity>;
    goals: object;
    viewLog: ViewLog;

    constructor(private challService: ChallengeService, private location: Location, private rewardsService: RewardsService,
                private activityService: ActivityService, private goalService: GoalService, public popoverController: PopoverController,
                private trackingService: TrackingService) {
        this.location = location;
        this.rewardsService.getWonTrophies().subscribe(
            rewards => this.trophies = rewards.map(trophy => this.rewardsService.getTrophy(trophy.id)));
        this.rewardsService.getAvailableTrophies().subscribe(
            rewards => this.inactTrophies = rewards.map(trophy => this.rewardsService.getTrophy(trophy)));
        // this.trophies = Trophy.defaultTrophies;
        this.activityService.getAllUserActivities().subscribe(activities => this.activities = activities);
        this.goalService.getGoalWins().subscribe(goals => this.goals = goals);
    }


    ngOnInit() {
        this.viewLog = this.trackingService.startRecordingViewTime('trophies');
    }

    ngOnDestroy() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
    }

    initializeTrophies() {
        this.rewardsService.initializeTrophies().then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    updateTrophies() {
        console.log(this.activities);
        console.log(this.goals);
        this.rewardsService.updateTrophies(this.activities, this.goals).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    async presentPopover(trophy: Trophy, event) {
        const popover = await this.popoverController.create({
            component: TrophyPopover,
            event,
            componentProps: {
                trophy
            }
        });
        return await popover.present();
    }

    goBack() {
        this.location.back();
    }

}
