import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FCM } from '@ionic-native/fcm/ngx';
import {NavController} from '@ionic/angular';
import {UserService} from 'src/app/services/user/user.service';
import { AlertController } from '@ionic/angular';
import {TrackingService} from './services/tracking/tracking.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private navCtrl: NavController,
    private userService: UserService,
    public alertController: AlertController,
    private trackingService: TrackingService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getToken().then(token => {
        console.log(token);
        this.userService.changeUserToken(token);
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        this.userService.changeUserToken(token);
      });
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
            console.log('Received in background ' + data);
            // this.router.navigate([data.landing_page, data.price]);
            // this.presentAlertConfirm(data.header, data.text);
            this.trackingService.setReaction(data.id, data.type, 'positive');
            this.navCtrl.navigateForward('/menu/dashboard');

        } else {
            console.log('Received in foreground ' + data);
            // this.router.navigate([data.landing_page, data.price]);
            this.presentAlertConfirm(data.header, data.text, data.id, data.type);
            this.navCtrl.navigateForward('/menu/dashboard');
        }

    });

    });
  }

  async presentAlertConfirm(header: string, text: string, id: string, type: string) {
    const alert = await this.alertController.create({
      header,
      message: text,
      buttons: [
        {
          text: 'Like It!',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Naaah',
          handler: () => {
            this.trackingService.setReaction(id, type, 'positive');
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


}
