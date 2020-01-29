import {Component, OnInit} from '@angular/core';

import {Challenge} from '../../model/challenge';
import {ChallengeService} from '../../services/challenges/challenge.service';
import {Observable} from 'rxjs';
import {PopoverController} from '@ionic/angular';
import {ChallengePopoverComponent} from 'src/app/challenge-popover/challenge-popover.component';

@Component({
    selector: 'app-admin-dashboard-challenges',
    templateUrl: './admin-dashboard-challenges.page.html',
    styleUrls: ['./admin-dashboard-challenges.page.scss'],
})
export class AdminDashboardChallengesPage implements OnInit {
    challenges: Array<Challenge>;
    challengesObserve: Observable<Array<Challenge>>;


    constructor(private challService: ChallengeService, public popoverController: PopoverController) {
        this.challengesObserve = this.challService.getAllAvailableChallenges();
        this.challengesObserve.subscribe(result => this.updateAllChallenges(result));

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
                this.challenges.splice(i, i + 1);
            }
        }
    }


}
