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

    /**
     * gets ALL challenges
     */
    this.challengesObserve.subscribe(result => 
      
      this.updateAllChallenges(result)
      
      );

    this.challengesActiveObserve = this.challService.getAllUserActiveChallenges();

    /**
     * gets ALL challenges user participates in
     */
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
  }

  ngOnInit() {

  }
  /**
   * this sets the local challenges & identifies the valid challenges
   * @param newChallenges income from service call as array
   */
 updateAllChallenges(newChallenges: Array<Challenge>){
    this.challenges = newChallenges;
    this.identifyInvalidChallenges(this.challenges);
  }

  /**
   * this is the local list of challenges which the user participates
   * @param newActive active array
   */

  async updateAllActiveChallenges(newActive: Array<Challenge>){
    this.activeChallenges = newActive;
    this.identifyInvalidChallenges(this.activeChallenges);
    
  }

  /**this adds an challenge if you want to participate
   * 
   */
  addToActiveList(challenge:Challenge){
    this.activeChallenges.push(challenge);
    this.identifyChallenge(challenge);
    this.challService.registerOnChallenge(challenge);   
    this.challService.addChallengeToActive(this.activeChallenges);
  }

  /**
   * this sorts the array which the user has registered to according to challenges
   * @param activeChallenge activeChallenge array
   */
  removeFromActiveList(activeChallenge:Challenge){
    this.challenges.push(activeChallenge);
    this.identifyActiveChallenge(activeChallenge);
    this.challService.deRegisterOnChallenge(activeChallenge);
    this.challService.addChallengeToActive(this.activeChallenges);
  }

  /**
   * identify the challenges you participate in order to sort them out of the local all challenges array
   * @param challenge challenge for identification
   */
  identifyChallenge(challenge:Challenge){
    for(var i = 0; i<this.challenges.length; i++){
      if(this.challenges[i].id === challenge.id){
        this.challenges.splice(i,i+1);
      }
    }
  }

  /**
   * sorts the ended challenges out according to finish or endtime
   * @param challenges array of all challenges
   */
  identifyInvalidChallenges(challenges:Array<Challenge>){
    var date = new Date();
    for(var i = 0; i<challenges.length; i++){
      if(challenges[i].endTime.getTime() < date.getTime() || challenges[i].finished){
        challenges.splice(i,i+1);
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
