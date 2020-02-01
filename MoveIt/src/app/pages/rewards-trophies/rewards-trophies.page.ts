import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {Challenge} from '../../model/challenge';

import {ChallengeService} from '../../services/challenges/challenge.service';

import {Observable} from 'rxjs';
import {RewardsService} from '../../services/rewards/rewards.service';
import {Trophy} from '../../model/trophy';
import {ActivityService} from '../../services/activity/activity.service';
import {GoalService} from '../../services/goal/goal.service';
import {Activity} from '../../model/activity';

@Component({
    selector: 'app-rewards-trophies',
    templateUrl: './rewards-trophies.page.html',
    styleUrls: ['./rewards-trophies.page.scss'],
})
export class RewardsTrophiesPage implements OnInit {
    trophies: any;
    inactTrophies: any;
    activities: Array<Activity>;
    goals: object;
    challenges: Array<Challenge>;
    challengesObserve: Observable<Array<Challenge>>;
    challengesActiveObserve: Observable<Array<Challenge>>;
    activeChallenges: Array<Challenge>;

    constructor(private challService: ChallengeService, private location: Location, private rewardsService: RewardsService, private activityService: ActivityService, private goalService: GoalService) {
        // this.challengesObserve = this.challService.getAllAvailableChallenges();
        //
        // this.challengesObserve.subscribe(result => this.updateAllChallenges(result));
        //
        // this.challengesActiveObserve = this.challService.getAllUserActiveChallenges();
        //
        // this.challengesActiveObserve.subscribe(result => {this.updateAllActiveChallenges(result);
        //        for(var i = 0; i< this.activeChallenges.length; i++){
        //   this.identifyChallenge(this.activeChallenges[i]);
        // }});
        this.location = location;
        this.trophies = Trophy.defaultTrophies;
        this.activityService.getAllUserActivities().subscribe(activities => this.activities = activities);
       
       
       this.inactTrophies = [
           {
            title: "Not achieved"   
           },
           {
            title: "Not achieved"   
           },
           {
            title: "Not achieved"   
           }
       ]
        // this.goalService.getGoalWins().subscribe(goals => this.goals = goals);
        /*this.challenges= [
          {
            description: 'Run the equivalent of a marathon during one week',
            title: 'Run 100 km within a week',
            startDate: 33,
            endDate: 55,
            price: '30 Euro Amazon Gift Card'
          },
          {
            description: 'Run the equivalent of a marathon during one week',
            title: 'Run 150 km within a week',
            startDate: 33,
            endDate: 55,
            price: '30 Euro Amazon Gift Card'
          },
        ]*/


        /*this.activeChallenges= [
          {
            description: 'Run the equivalent of a marathon during one week',
            title: 'Run 50 km within a week',
            startDate: 33,
            endDate: 55,
            price: '30 Euro Amazon Gift Card'
          },
          {
            description: 'Run the equivalent of a marathon during one week',
            title: 'Run 75 km within a week',
            startDate: 33,
            endDate: 55,
            price: '30 Euro Amazon Gift Card'
          }
        ]*/
    }

    ngOnInit() {

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

    updateAllChallenges(newChallenges: Array<Challenge>) {
        this.challenges = newChallenges;
    }

    updateAllActiveChallenges(newActive: Array<Challenge>) {
        this.activeChallenges = newActive;
    }


    addToActiveList(challenge: Challenge) {
        this.activeChallenges.push(challenge);
        this.identifyChallenge(challenge);
      //  this.challService.addChallengeToActive(this.activeChallenges);
    }

    removeFromActiveList(activeChallenge: Challenge) {
        this.challenges.push(activeChallenge);
        this.identifyActiveChallenge(activeChallenge);
      //  this.challService.addChallengeToActive(this.activeChallenges);
    }

    identifyChallenge(challenge: Challenge) {
        console.log(challenge);
        for (let i = 0; i < this.challenges.length; i++) {
            if (this.challenges[i].title === challenge.title) {
                this.challenges.splice(i, i + 1);
            }
        }
    }

    identifyActiveChallenge(challenge: Challenge) {
        console.log(challenge);
        for (let i = 0; i < this.activeChallenges.length; i++) {
            if (this.activeChallenges[i].title === challenge.title) {
                this.activeChallenges.splice(i, i + 1);
            }
        }
    }

    goBack() {
        this.location.back();
    }

}
