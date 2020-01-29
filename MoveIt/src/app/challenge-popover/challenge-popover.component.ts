import {Component, OnInit} from '@angular/core';
import {AlertController, PopoverController} from '@ionic/angular';
import {Challenge} from '../model/challenge';
import {ChallengeService} from '../services/challenges/challenge.service';

@Component({
    selector: 'app-challenge-popover',
    templateUrl: './challenge-popover.component.html',
    styleUrls: ['./challenge-popover.component.scss'],
})
export class ChallengePopoverComponent implements OnInit {
    challenge: Challenge;
    description: string;
    title: string;
    price: string;
    id: string;

    constructor(public popoverController: PopoverController, private challengeService: ChallengeService, public alertController: AlertController) {
        this.challenge = new Challenge();
    }

    ngOnInit() {
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Success',
            message: 'Challenge added successfully!',
            buttons: ['OK'],
        });

        await alert.present();
        const result = await alert.onDidDismiss();
        console.log(result);
    }

    addChallenge() {
        this.challengeService.createChallenge(this.challenge).then(
            (challenge) => {
                console.log(challenge);
            })
            .catch(err => console.error(err)
            );
        this.presentAlert();
    }


}
