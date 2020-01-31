import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';


import {Observable} from 'rxjs';

import {GoalService} from '../../services/goal/goal.service';

import {TrophyService} from '../../services/trophies/trophy.service';

import {LeaderboardObject} from '../../model/leaderboardObject';

import {GoalArray} from '../../model/goalArray';

import {User} from '../../model/user';

import { TrophyArray } from 'src/app/model/trophyArray';

import { ViewLog } from 'src/app/model/viewLog';

import {UserService} from '../../services/user/user.service';

import {TrackingService} from '../../services/tracking/tracking.service';

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

  trophiesList: Array<LeaderboardObject>
  trophiesObserve: Observable<TrophyArray[]>

  challengesList: Array<LeaderboardObject>

  tempUsername : string;
  private currentUser: User;

  startTime: Date;
  endTime: Date;

  constructor(private goalservice: GoalService, private trophyService: TrophyService, private userService: UserService, private trackingService: TrackingService, private location:Location) { 

   /* //Observable1
    this.activitiesObserve = this.goalservice.getAllOtherAvailableGoals();

    //Observable2
    this.trophiesObserve = this.trophyService.getListOfAllUserAndTherWonTrophies();

    //Observable1 in action
    this.activitiesObserve.subscribe(result => {
      this.pushMinuteObjects(result);
      
      //Observable2 in action
      this.trophiesObserve.subscribe(result => this.pushTrophyObjects(result));
    });
    this.currentUser = this.authService.getFullUser();

    console.log(this.currentUser);*/
  }

  /**
   * first get all important observables with the corresponding database queries
   */
    ngOnInit() {
      this.startTime = new Date();
  //Observable1
      this.activitiesObserve = this.goalservice.getAllOtherAvailableGoals();

      //Observable2
      this.trophiesObserve = this.trophyService.getListOfAllUserAndTherWonTrophies();

      //Observable1 in action
      this.activitiesObserve.subscribe(result => {
        this.pushMinuteObjects(result);
        
        //Observable2 in action
        this.trophiesObserve.subscribe(result => this.pushTrophyObjects(result));
      });
      
      
      this.userService.getUser().subscribe(user => this.currentUser = user);
      console.log(this.currentUser);

      console.log(this.currentUser);
    }

    
    ngOnDestroy(){
      this.endTime = new Date();
      var viewLog = new ViewLog("Leaderboard-Detail", this.startTime, this.endTime);
      this.trackingService.logViewTime(viewLog);
      console.log(viewLog);
    }


    /**
   * This method pushes the result of a query into the respective instances in order to make them visible on the UI
   * @param result the param from the database query which gets the array of all trophies won per user
   */
  async pushTrophyObjects(result){
    var testArray = new Array<LeaderboardObject>();

    for(var i = 0; i < result.length; i++){
      var oneResult = result[i];
      if(oneResult){
   
              let entity1 = await new LeaderboardObject(oneResult.id, oneResult.won.length ,this.userService);

              console.log(entity1);
              
              testArray.push(entity1);
        }
      }
        
    this.trophiesList = testArray;

    this.sortArrays();
  }

  /**
   * This method pushes the result of a query into the respective instances in order to make them visible on the UI
   * @param result the param from the database query which gets the array of all goalsprogress per user
   */
  async pushMinuteObjects(result){
    var testArray = new Array<LeaderboardObject>();
    var testArray2 = new Array<LeaderboardObject>();

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

  /**
   * this method sorts all arrays for the leaderboard visualization
   */
  sortArrays(){
    if(this.activitiesModerate !== undefined){
    this.activitiesModerate.sort( (a,b) => a.compareTo(b));
    this.activitiesVigorous.sort((a,b) => a.compareTo(b));
    }

    if(this.trophiesList !== undefined){
    this.trophiesList.sort((a,b) => a.compareTo(b));
    }

        /* console.log("VIGIROUS");
         console.log(this.activitiesVigorous);

         console.log("MODERATE");
         console.log(this.activitiesModerate);*/
    }



    goBack() {
        this.location.back();
    }

}
