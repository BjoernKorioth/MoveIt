import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticateService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';

import * as firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyAeeexHFSp2HevDoOi7MdzCLdgET6QtMg4",
  authDomain: "moveit-2019.firebaseapp.com",
  databaseURL: "https://moveit-2019.firebaseio.com",
  projectId: "moveit-2019",
  storageBucket: "moveit-2019.appspot.com",
  messagingSenderId: "743283522973",
  appId: "1:743283522973:web:43cd7c986b9811d8100374",
  measurementId: "G-1N6YS1R28Y"
};


firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
