import {Component, OnInit} from '@angular/core';

import {Challenge} from '../../model/challenge';
import {ChallengeService} from '../../services/challenges/challenge.service';
import {Observable} from 'rxjs';
import {PopoverController} from '@ionic/angular';
import {ChallengePopoverComponent} from 'src/app/challenge-popover/challenge-popover.component';
import { UserService } from 'src/app/services/user/user.service';
import { RewardsService } from 'src/app/services/rewards/rewards.service';
import { User } from 'src/app/model/user';

@Component({
    selector: 'app-admin-dashboard-challenges',
    templateUrl: './admin-dashboard-challenges.page.html',
    styleUrls: ['./admin-dashboard-challenges.page.scss'],
})
export class AdminDashboardChallengesPage implements OnInit {
    challenges: Array<Challenge>;
    challengesObserve: Challenge[];
    users: Array<User>;
    winnerId: string;
    today: Date = new Date();


    constructor(private rewardsService: RewardsService, private challService: ChallengeService, public popoverController: PopoverController, private userService: UserService) {
        this.challService.getAllAvailableChallenges().subscribe(data => {
            this.challenges = data;
            console.log(this.challenges);
            this.challenges.forEach(function(challenge) {
                
                challenge.startTimeIso = challenge.startTime.toISOString();
                challenge.endTimeIso = challenge.endTime.toISOString();
            })
        });
       
        this.userService.getUsers().subscribe(data => this.users = data);
    }

    editChallenge(challenge: Challenge) {
        console.log(challenge);
        challenge.startTime = new Date(challenge.startTimeIso);                                                       
        challenge.endTime = new Date(challenge.endTimeIso);  
        this.challService.editChallenge(challenge).then(
            res => {
                console.log(res);
            },
            err => console.log(err)
        );
    }

    async presentPopover(event) {
        const popover = await this.popoverController.create({
            component: ChallengePopoverComponent,
            event
        });
        return await popover.present();
    }

    ngOnInit() {
    }

    updateAllChallenges(newChallenges: Array<Challenge>) {
        this.challenges = newChallenges;
    }

    identifyChallenge(challenge: Challenge) {
        console.log(challenge);
        for (let i = 0; i < this.challenges.length; i++) {
            if (this.challenges[i].title === challenge.title) {
                this.challenges.splice(i, 1);
            }
        }
    }

    endChallenge(challenge: Challenge){
        this.challService.finishChallenge(challenge).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    selectWinner(challenge: Challenge, userId:string){
        console.log(userId);
        this.challService.setWinner(challenge, userId).then(
            res => console.log(res),
            err => console.log(err)
        );

        this.rewardsService.winChallenge(challenge.id,userId).then(
            res => console.log(res),
            err => console.log(err)
        );
    }
}
