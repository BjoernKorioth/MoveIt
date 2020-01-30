import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Trophy} from '../../model/trophy';

import {TrophyArray} from '../../model/trophyArray';

import {map} from 'rxjs/operators';

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

  getListOfAllUserAndTherWonTrophies(){
    const ref = this.fireDatabase.list<TrophyArray>('/trophyStatus/');
    // Retrieve an array, but with its metadata. This is necesary to have the key available
    // An array of Goals is reconstructed using the fromFirebaseObject method
    return ref.snapshotChanges().pipe(
        map(user => user.map(trophypayload => (TrophyArray.fromFirebaseObject(trophypayload.key, trophypayload.payload.val())))));
  }
  
  }
  