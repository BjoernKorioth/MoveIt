import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';


import {Observable} from 'rxjs';

import {GoalService} from '../../services/goal/goal.service';

import {LeaderboardObject} from '../../model/leaderboardObject';

import {GoalArray} from '../../model/goalArray';

import {User} from '../../model/user';
import {UserService} from '../../services/user/user.service';


@Component({
    selector: 'app-leaderboard-detail',
    templateUrl: './leaderboard-detail.page.html',
    styleUrls: ['./leaderboard-detail.page.scss'],
})
export class LeaderboardDetailPage implements OnInit {
    persons: any;
    ranking = 'actMinutes';

    /*constructor(private location: Location) {
      this.location = location;

    this.persons = [
      {
        name: 'Maya',
        age: 20,
        actMinutes: 150,
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Ursula',
        age: 25,
        actMinutes: 120,
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Phil',
        age: 40,
        actMinutes: 115,
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Mary',
        age: 25,
        actMinutes: 100,
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Maya',
        age: 20,
        actMinutes: 150,
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Ursula',
        age: 25,
        actMinutes: 120,
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Phil',
        age: 40,
        actMinutes: 115,
        image: './assets/Profilbild.jpg'
      }
    ];
    }*/

    trophies: any;
    activitiesModerate: Array<LeaderboardObject>;
    activitiesVigorous: Array<LeaderboardObject>;
    activitiesObserve: Observable<GoalArray[]>;

    tempUsername: string;
    private currentUser: User;

    constructor(private goalservice: GoalService, private userService: UserService, private location: Location) {


        this.activitiesObserve = this.goalservice.getAllOtherAvailableGoals();

        this.activitiesObserve.subscribe(result => this.pushObjects(result));
        this.userService.getUser().subscribe(user => this.currentUser = user);
        console.log(this.currentUser);
    }

    async ngOnInit() {

    }

    async pushObjects(result) {
        const testArray = new Array<LeaderboardObject>();
        const testArray2 = new Array<LeaderboardObject>();

        for (let i = 0; i < result.length; i++) {
            const oneResult = result[i];
            if (oneResult) {
                if (oneResult.goal.type === 'moderate' && oneResult.goal.duration === 'weekly') {

                    const entity1 = await new LeaderboardObject(oneResult.id, oneResult.goal.current, this.userService);

                    testArray.push(entity1);
                } else if (oneResult.goal.type === 'vigorous' && oneResult.goal.duraion === 'weekly') {

                    const entity2 = new LeaderboardObject(oneResult.id, oneResult.goal.current, this.userService);

                    testArray2.push(entity2);
                }
            }
        }

        this.activitiesModerate = testArray;
        this.activitiesVigorous = testArray2;

        this.sortArrays();
    }

    sortArrays() {
        this.activitiesModerate.sort((a, b) => a.compareTo(b));
        this.activitiesVigorous.sort((a, b) => a.compareTo(b));

        /* console.log("VIGIROUS");
         console.log(this.activitiesVigorous);

         console.log("MODERATE");
         console.log(this.activitiesModerate);*/
    }


    goBack() {
        this.location.back();
    }

}
