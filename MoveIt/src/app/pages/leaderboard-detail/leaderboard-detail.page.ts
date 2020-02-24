import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';


import {Observable} from 'rxjs';

import {GoalService} from '../../services/goal/goal.service';

import {TrophyService} from '../../services/trophies/trophy.service';

import {LeaderboardObject} from '../../model/leaderboardObject';

import {GoalArray} from '../../model/goalArray';

import {User} from '../../model/user';

import {TrophyArray} from 'src/app/model/trophyArray';

import {ChallengesArray} from 'src/app/model/challengesArray';

import {ChallengeService} from '../../services/challenges/challenge.service';

import {UserService} from '../../services/user/user.service';

import {Router, NavigationExtras} from '@angular/router';


@Component({
    selector: 'app-leaderboard-detail',
    templateUrl: './leaderboard-detail.page.html',
    styleUrls: ['./leaderboard-detail.page.scss'],
})
export class LeaderboardDetailPage implements OnInit {
    persons: any;
    ranking = 'actMinutes';

    rewards: boolean = false;
    group: Observable<string>;
    config: Observable<string>;

    trophies: any;
    activitiesModerate: Array<LeaderboardObject>;
    activitiesObserve: Observable<GoalArray[]>;

    trophiesList: Array<LeaderboardObject>;
    trophiesObserve: Observable<TrophyArray[]>;

    challengeList: Array<LeaderboardObject>;
    challengesObserve: Observable<ChallengesArray[]>;

    tempUsername: string;

    currentUser: User;

    constructor(private router:Router, private challService: ChallengeService, private goalService: GoalService, private trophyService: TrophyService, private userService: UserService,
                private location: Location) {
    }

    /**
     * first get all important observables with the corresponding database queries
     */
    ngOnInit() {
        // Observable1
        this.activitiesObserve = this.goalService.getAllOtherAvailableGoals();

        // Observable2
        this.trophiesObserve = this.trophyService.getListOfAllUserAndTherWonTrophies();

        this.challengesObserve = this.challService.getListOfAllUserAndTheirWonChallenges();

        // Observable1 in action
        this.activitiesObserve.subscribe(result => {
            this.pushMinuteObjects(result);

            // Observable2 in action
            this.trophiesObserve.subscribe(result2 => {this.pushTrophyObjects(result2);

            this.challengesObserve.subscribe(result3 => { 
                this.pushChallengeObjects(result3);
            
            });

            })

        });
        //set chart active if rewards group is assigned to group
        this.group = this.userService.getUsergroup();
        this.group.subscribe(group => this.updateGroup(group));

        this.userService.getUser().subscribe(user => this.currentUser = user);
    }

    viewProfile(counter, list){
        let navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(list[counter].id)
            }
        }
        this.router.navigate(['/menu/profile/profile/view'], navigationExtras);
    }

    updateGroup(group) {

        this.config = this.userService.getGroupconfig(group);
        this.config.subscribe(config => this.setPages(config));

    }

    setPages(config) {
        const array = JSON.parse(config);
            if (array.indexOf('Rewards') > -1){
                this.rewards = true;
            };
    }

    /**
     * This method pushes the result of a query into the respective instances in order to make them visible on the UI
     * @param result the param from the database query which gets the array of all trophies won per user
     */
    async pushTrophyObjects(result) {
        const testArray = new Array<LeaderboardObject>();

        for (let i = 0; i < result.length; i++) {
            const oneResult = result[i];
            if (oneResult) {

                const entity1 = await new LeaderboardObject(oneResult.id, oneResult.won.length, this.userService);

                console.log(entity1);

                testArray.push(entity1);
            }
        }

        this.trophiesList = testArray;
        this.sortArrays();
    }

    /**
     * This method pushes the result of a query into the respective instances in order to make them visible on the UI
     * @param result the param from the database query which gets the array of all trophies won per user
     */
    async pushChallengeObjects(result) {
        const testArray = new Array<LeaderboardObject>();

        for (let i = 0; i < result.length; i++) {
            const oneResult = result[i];
            if (oneResult) {

                const entity1 = await new LeaderboardObject(oneResult.id, oneResult.won.length-1, this.userService);

                console.log(entity1);

                testArray.push(entity1);
            }
        }

        this.challengeList = testArray;
        this.sortArrays();
    }

    /**
     * This method pushes the result of a query into the respective instances in order to make them visible on the UI
     * @param result the param from the database query which gets the array of all goalsprogress per user
     */
    pushMinuteObjects(result) {
        const testArray = new Array<LeaderboardObject>();
        const testArray2 = new Array<LeaderboardObject>();

        for (let i = 0; i < result.length; i++) {
            const oneResult = result[i];
            console.log(oneResult);
            if (oneResult) {
                if (oneResult.type ==='weekly') {

                    const entity1 = new LeaderboardObject(oneResult.id, oneResult.activity, this.userService);

                    testArray.push(entity1);

                }
            }
        }

        this.activitiesModerate = testArray;

        this.sortArrays();
    }

    /**
     * this method sorts all arrays for the leaderboard visualization
     */
    sortArrays() {
        if (this.activitiesModerate !== undefined) {
            this.activitiesModerate.sort((a, b) => a.compareTo(b));
        }

        if (this.trophiesList !== undefined) {
            this.trophiesList.sort((a, b) => a.compareTo(b));
        }

        if (this.challengeList !== undefined) {
            this.challengeList.sort((a, b) => a.compareTo(b));
        }

    }

    calculateAge(birthday: Date){
        let bday = new Date(birthday);
        let timeDiff = Math.abs(Date.now() - bday.getTime());
        return Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      }


    goBack() {
        this.location.back();
    }

}
