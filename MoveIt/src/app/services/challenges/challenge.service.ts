import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Challenge} from '../../model/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private fireDatabase: AngularFireDatabase) { 


  }



getAllAvailableChallenges() {
    return this.fireDatabase.list<Challenge>('challenges').valueChanges();
}

getAllUserActiveChallenges(){
  return this.fireDatabase.list<Challenge>('/users/' + firebase.auth().currentUser.uid + '/challengesActive').valueChanges();
}

addChallengeToActive(challenge: Array<Challenge>){
return new Promise<any>((resolve, reject) => {
  this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).child('challengesActive')
                .set(challenge).then(
                res => resolve(res),
                err => reject(err)
            );
});
}

}
