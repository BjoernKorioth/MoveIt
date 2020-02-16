import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Challenge } from '../model/challenge';
import { ChallengeService } from '../services/challenges/challenge.service';

@Component({
  selector: 'app-challenge-popover',
  templateUrl: './challenge-popover.component.html',
  styleUrls: ['./challenge-popover.component.scss'],
})
export class ChallengePopoverComponent implements OnInit {

  challenge: Challenge;

  constructor(public popoverController: PopoverController, private challengeService: ChallengeService, public alertController: AlertController, public toastController: ToastController) {
     this.challenge = new Challenge();
     console.log(this.challenge);
      
   }

  ngOnInit() {}

  async presentToast() {
    const controller = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Challenge added successfully!',
        showCloseButton: true
    }).then(toast => {
        toast.present();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Challenge added successfully!',
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  addChallenge() {
    console.log(this.challenge);
    var participantsArray = [];
    var participants = {};

    var random = Math.random()*30;


    for(var i = 0; i<random; i++){
      participants["test"+i] = i;
    }
    
    this.challenge.participants = [];
    this.challengeService.createChallenge(this.challenge, participants).then(
      (challenge) => {
          console.log(challenge);
          this.presentToast();
        })
        .catch(err => console.error(err)
        
    );
  }


}
