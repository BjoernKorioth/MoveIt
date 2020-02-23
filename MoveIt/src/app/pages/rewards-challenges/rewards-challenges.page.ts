import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {Challenge} from '../../model/challenge';

import {ChallengeService} from '../../services/challenges/challenge.service';

import {combineLatest} from 'rxjs';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
    selector: 'app-rewards-challenges',
    templateUrl: './rewards-challenges.page.html',
    styleUrls: ['./rewards-challenges.page.scss'],
})
export class RewardsChallengesPage implements OnInit, OnDestroy {
    trophies: any;
    challenges: Array<Challenge> = [];
    activeChallenges: Array<Challenge> = [];

    date: Date;
    viewLog: ViewLog;


    constructor(private challengeService: ChallengeService, private location: Location, private trackingService: TrackingService) {
        this.location = location;

        // this.challengeService.getAllChallenges().subscribe(challenges => {
        //         this.challenges = challenges;
        //         // this.identifyInvalidChallenges(this.challenges);
        //         this.calculatedAll = true;
        //     }
        // );

        combineLatest([this.challengeService.getAllChallenges(), this.challengeService.getAllUserActiveChallenges()])
            .subscribe(([challengesList, activeChallengeIds]) => {
                const activeChallenges = [];
                const challenges = challengesList.map(x => x);
                for (const challengeId of activeChallengeIds) {
                    const challenge = challenges.find(element => element.id === challengeId);
                    if (challenge instanceof Challenge) {
                        activeChallenges.push(challenge);
                    } else {
                        console.log(challengeId);
                        console.log(challenges);
                    }
                    challenges.splice(challenges.indexOf(challenge), 1);
                }
                console.log(activeChallenges);
                console.log(challenges);
                this.challenges = challenges;
                this.activeChallenges = activeChallenges;
                // this.identifyInvalidChallenges(this.activeChallenges);
            });
    }


    ngOnDestroy() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
    }

    ngOnInit() {
        this.viewLog = this.trackingService.startRecordingViewTime('challenges');
        this.date = new Date();
    }

    /**
     * this adds an challenge if you want to participate
     */
    addToActiveList(challenge: Challenge) {
        this.challengeService.registerOnChallenge(challenge);
        this.challengeService.addChallengeToActive(challenge);
    }

    /**
     * this sorts the array which the user has registered to according to challenges
     * @param activeChallenge activeChallenge array
     */
    removeFromActiveList(activeChallenge: Challenge) {
        this.challenges.push(activeChallenge);
        this.challengeService.deRegisterOnChallenge(activeChallenge);
        this.challengeService.removeChallengeFromActive(activeChallenge);
    }

    /**
     * identify the challenges you participate in order to sort them out of the local all challenges array
     * @param id id for challenge for identification
     */
    identifyChallengeFromAll(id: string) {
        for (let i = 0; i < this.challenges.length; i++) {
            if (this.challenges[i].id === id) {
                this.activeChallenges.push(this.challenges[i]);
                this.challenges.splice(i, 1);
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
                this.activeChallenges.splice(i, 1);
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
                challenges.splice(i, 1);
            }
        }
    }

    goBack() {
        this.location.back();
    }

}
