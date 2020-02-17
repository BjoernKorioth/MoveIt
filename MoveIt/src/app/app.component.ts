import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FCM } from '@ionic-native/fcm/ngx';
import {NavController} from '@ionic/angular';
import {UserService} from 'src/app/services/user/user.service';


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
            //this.router.navigate([data.landing_page, data.price]);
            this.navCtrl.navigateForward('/menu/dashboard');
        } else {
            console.log('Received in foreground ' + data);
            //this.router.navigate([data.landing_page, data.price]);
            this.navCtrl.navigateForward('/menu/dashboard');
        }
    });
          
    });
  }

}
