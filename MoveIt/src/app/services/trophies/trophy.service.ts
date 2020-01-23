import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Trophy} from '../../model/trophy';

@Injectable({
    providedIn: 'root'
})
export class TrophyService {
    trophyLocation = '/trophies/';

    constructor(private fireDatabase: AngularFireDatabase) { 


    }
  
    getTrophy(name: string) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/trophies/' + firebase.auth().currentUser.uid + '/' + name).once('value').then(
                trophy => resolve(Trophy.fromFirebaseObject(name, trophy.val())),
                err => reject(err)
            );
        });
    }

  
  
  addTrophiesToActive(challenge: Array<Trophy>){
  return new Promise<any>((resolve, reject) => {
    this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).child('trophiesActive')
                  .set(challenge).then(
                  res => resolve(res),
                  err => reject(err)
              );
  });
  }
  
  }
  