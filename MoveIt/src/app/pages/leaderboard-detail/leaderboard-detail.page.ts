import { Component, OnInit } from '@angular/core';
import { Location } from  '@angular/common';


import {Observable} from 'rxjs';

import {GoalService} from '../../services/goals/goal.service'

import {LeaderboardObject} from '../../model/leaderboardObject'

@Component({
  selector: 'app-leaderboard-detail',
  templateUrl: './leaderboard-detail.page.html',
  styleUrls: ['./leaderboard-detail.page.scss'],
})
export class LeaderboardDetailPage implements OnInit {
  persons: any;
  ranking: string = "actMinutes";

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
    },
    {
      name: 'Mary',
      age: 25,
      actMinutes: 100,
      image: './assets/Profilbild.jpg'
    }
  ];
  }*/

  trophies: any;
  activitiesModerate: Array<LeaderboardObject>;
  activitiesVigorous: Array<LeaderboardObject>;
  activitiesObserve: Observable<any>;

  constructor(private goalservice: GoalService, private location:Location) { 

    this.activitiesObserve = this.goalservice.getAllOtherAvailableGoals();

    this.activitiesObserve.subscribe(result => this.pushObjects(result));
  }

  ngOnInit() {

  }

  pushObjects(result){
    var testArray = new Array<LeaderboardObject>();
    var testArray2 = new Array<LeaderboardObject>();
    console.log(result);
    for(var i = 0; i < result.length; i++){
      var oneResult = result[i];
      console.log(oneResult);

          if(oneResult.weeklyModerate !== undefined && oneResult.weeklyVigorous !== undefined){
              let entity1 = new LeaderboardObject("TestUser", oneResult.weeklyModerate.current);

              testArray.push(entity1);

              let entity2 = new LeaderboardObject("TestUser", oneResult.weeklyVigorous.current);

              testArray2.push(entity2);
          }
        }
        
    this.activitiesModerate = testArray;
    this.activitiesVigorous = testArray2;

    this.sortArrays();
  }

  sortArrays(){
    this.activitiesModerate.sort( (a,b) => a.compareTo(b));
    this.activitiesVigorous.sort((a,b) => a.compareTo(b));

    console.log("VIGIROUS");
    console.log(this.activitiesVigorous);

    console.log("MODERATE");
    console.log(this.activitiesModerate);
  }

  goBack(){
    this.location.back();
  }

}
