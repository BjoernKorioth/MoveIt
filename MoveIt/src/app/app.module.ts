import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';

import {AuthenticateService} from './services/authentication/authentication.service';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import { Health } from '@ionic-native/health/ngx';


const firebaseConfig = {
    apiKey: 'AIzaSyAeeexHFSp2HevDoOi7MdzCLdgET6QtMg4',
    authDomain: 'moveit-2019.firebaseapp.com',
    databaseURL: 'https://moveit-2019.firebaseio.com',
    projectId: 'moveit-2019',
    storageBucket: 'moveit-2019.appspot.com',
    messagingSenderId: '743283522973',
    appId: '1:743283522973:web:43cd7c986b9811d8100374',
    measurementId: 'G-1N6YS1R28Y'
};


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AppRoutingModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthGuardModule,
        AngularFireStorageModule,
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireStorageModule // imports firebase/storage only needed for storage features
  
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthenticateService,
        Health,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
