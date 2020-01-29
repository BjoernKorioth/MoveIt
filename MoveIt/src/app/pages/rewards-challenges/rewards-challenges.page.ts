import { Component, OnInit } from '@angular/core';
import { Location } from  '@angular/common';

import {Challenge} from '../../model/challenge';

import {ChallengeService} from '../../services/challenges/challenge.service';

import {Observable} from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-rewards-challenges',
  templateUrl: './rewards-challenges.page.html',
  styleUrls: ['./rewards-challenges.page.scss'],
})
export class RewardsChallengesPage implements OnInit {
  trophies: any;
  challenges: Array<Challenge>;
  challengesObserve: Observable<Array<Challenge>>;
  challengesActiveObserve: Observable<Array<Challenge>>
  activeChallenges: Array<Challenge>;

  constructor(private challService: ChallengeService, private location:Location) { 

    this.challengesObserve = this.challService.getAllChallenges();

    this.challengesObserve.subscribe(result => 
      
      this.updateAllChallenges(result)
      
      );

    this.challengesActiveObserve = this.challService.getAllUserActiveChallenges();

    this.challengesActiveObserve.subscribe(result => {
      
      this.updateAllActiveChallenges(result);

      for(var i = 0; i< this.activeChallenges.length; i++){
      this.identifyChallenge(this.activeChallenges[i]);
    }});

    this.location = location;
    this.trophies = [
      {
        description: 'You get this trophy for winning 10 times a daily goal.',
        title: '10 Daily Goals',
        image: './assets/Trophy.png'
      },
      {
        description: 'You get this trophy for winning 10 times a daily goal.',
        title: '10 Daily Goals',
        image: './assets/Trophy.png'
      },
      {
        description: 'You get this trophy for winning 10 times a daily goal.',
        title: '10 Daily Goals',
        image: './assets/Trophy.png'
      }
    ]
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

   /*this.challengesObserve = this.challService.getAllChallenges();

   this.challengesActiveObserve = this.challService.getAllUserActiveChallenges();

    this.challengesObserve.subscribe(result => {
      
      this.updateAllChallenges(result)
      
      this.challengesActiveObserve.subscribe(result => {
        this.updateAllActiveChallenges(result);
        for(var i = 0; i< this.activeChallenges.length; i++){
        this.identifyChallenge(this.activeChallenges[i]);
      }});
    
    });*/

   

   

  }

 updateAllChallenges(newChallenges: Array<Challenge>){
    this.challenges = newChallenges;
  }

  async updateAllActiveChallenges(newActive: Array<Challenge>){
    this.activeChallenges = newActive;
    
  }

  /*setParticipants(){
    for(var i = 0; i<this.activeChallenges.length; i++){
      console.log("IM in");
      this.challService.getListOfParticipants(this.activeChallenges[i]).then(result => this.activeChallenges[i].setNumber(result.length));
    }

    for(var i = 0; i<this.challenges.length; i++){
      console.log("IM iN");
      this.challService.getListOfParticipants(this.challenges[i]).then(result => this.challenges[i].setNumber(result.length));
    }
  }*/


  addToActiveList(challenge:Challenge){
    this.activeChallenges.push(challenge);
    this.identifyChallenge(challenge);
    this.challService.registerOnChallenge(challenge);   
    this.challService.addChallengeToActive(this.activeChallenges);
  }

  removeFromActiveList(activeChallenge:Challenge){
    this.challenges.push(activeChallenge);
    this.identifyActiveChallenge(activeChallenge);
    this.challService.deRegisterOnChallenge(activeChallenge);
    this.challService.addChallengeToActive(this.activeChallenges);
  }

  identifyChallenge(challenge:Challenge){
    console.log(challenge);
    console.log("CHALLENGES SIZE " + this.challenges.length)
    for(var i = 0; i<this.challenges.length; i++){
      if(this.challenges[i].title === challenge.title){
        this.challenges.splice(i,i+1);
      }
    }
  }

  identifyActiveChallenge(challenge:Challenge){
    console.log(challenge);
    for(var i = 0; i<this.activeChallenges.length; i++){
      if(this.activeChallenges[i].id === challenge.id){
        this.activeChallenges.splice(i,i+1);
      }

    }
  }

  goBack(){
    this.location.back();
  }

}
