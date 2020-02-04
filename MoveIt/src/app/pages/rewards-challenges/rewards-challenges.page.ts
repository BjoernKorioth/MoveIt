import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {Challenge} from '../../model/challenge';

import {ChallengeService} from '../../services/challenges/challenge.service';

import {Observable} from 'rxjs';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
    selector: 'app-rewards-challenges',
    templateUrl: './rewards-challenges.page.html',
    styleUrls: ['./rewards-challenges.page.scss'],
})
export class RewardsChallengesPage implements OnInit, OnDestroy {
    trophies: any;
    challenges: Array<Challenge>;
    challengesObserve: Observable<Array<Challenge>>;
    challengesActiveObserve: Observable<Array<string>>;
    keysOfActiveChallenges: Array<string>;
    activeChallenges: Array<Challenge>;

    calculatedActive: boolean;
    calculatedAll: boolean;

    date: Date;
    viewLog: ViewLog;


    constructor(private challService: ChallengeService, private location: Location, private trackingService: TrackingService) {

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
         *
         this.challengesActiveObserve.subscribe(result => {

      this.updateAllActiveChallenges(result);


    this.identifyInvalidChallenges(this.challenges);

      for(var i = 0; i< this.keysOfActiveChallenges.length; i++){
      this.identifyChallengeFromAll(this.keysOfActiveChallenges[i]);
    }

    this.identifyInvalidChallenges(this.activeChallenges);

    this.calculatedAll = true;
    this.calculatedActive = true;
  });*/

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
        ];
    }


    ngOnDestroy() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
    }

    ngOnInit() {
        this.viewLog = this.trackingService.startRecordingViewTime('challenges');


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


            this.identifyInvalidChallenges(this.challenges);

            for (let i = 0; i < this.keysOfActiveChallenges.length; i++) {
                this.identifyChallengeFromAll(this.keysOfActiveChallenges[i]);
            }

            this.identifyInvalidChallenges(this.activeChallenges);

            this.calculatedAll = true;
            this.calculatedActive = true;
        });
    }

    /**
     * this sets the local challenges & identifies the valid challenges
     * @param newChallenges income from service call as array
     */
    updateAllChallenges(newChallenges: Array<Challenge>) {
        this.challenges = newChallenges;
    }

    /**
     * this is the local list of challenges which the user participates
     * @param newActive active array
     */

    updateAllActiveChallenges(newActive: Array<string>) {
        this.keysOfActiveChallenges = newActive;
        this.activeChallenges = [];
    }

    /**this adds an challenge if you want to participate
     *
     */
    async addToActiveList(challenge: Challenge) {
        this.identifyChallengeFromAll(challenge.id);
        await this.challService.registerOnChallenge(challenge);
        this.challService.addChallengeToActive(challenge);
    }

    /**
     * this sorts the array which the user has registered to according to challenges
     * @param activeChallenge activeChallenge array
     */
    async removeFromActiveList(activeChallenge: Challenge) {
        this.identifyChallengeFromActive(activeChallenge.id);
        await this.challService.deRegisterOnChallenge(activeChallenge);
        this.challService.removeChallengeFromActive(activeChallenge);
    }

    /**
     * identify the challenges you participate in order to sort them out of the local all challenges array
     * @param id id for challenge for identification
     */
    identifyChallengeFromAll(id: string) {

        for (let i = 0; i < this.challenges.length; i++) {
            if (this.challenges[i].id === id) {
                this.activeChallenges.push(this.challenges[i]);
                this.challenges.splice(i, i + 1);
            }
        }
    }


    /**
     * identify the challenges you participate in order to sort them out of the local all challenges array
     * @param id id for challenge for identification
     */

    identifyChallengeFromActive(id: string) {

        for (let i = 0; i < this.activeChallenges.length; i++) {
            if (this.activeChallenges[i].id === id) {
                this.challenges.push(this.activeChallenges[i]);
                this.activeChallenges.splice(i, i + 1);
            }
        }
    }

    /**
     * sorts the ended challenges out according to finish or endtime
     * @param challenges array of all challenges
     */
    identifyInvalidChallenges(challenges: Array<Challenge>) {
        this.date = new Date();
        for (let i = 0; i < challenges.length; i++) {
            if (challenges[i].endTime.getTime() < this.date.getTime() || challenges[i].finished) {
                console.log('SYSTEM DATE: ' + this.date);
                console.log('Challenge date: ' + challenges[i].endTime);
                challenges.splice(i, i + 1);
            }
        }
    }

    goBack() {
        this.location.back();
    }

}
