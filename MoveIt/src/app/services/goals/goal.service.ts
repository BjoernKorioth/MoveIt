import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Goal} from '../../model/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private fireDatabase: AngularFireDatabase) { 


  }



getOwnAvailableGoals() {
    return this.fireDatabase.list<Goal>('/goals/' + firebase.auth().currentUser.uid).valueChanges();
}

getAllOtherAvailableGoals(){
    return this.fireDatabase.list<Goal>('/goals/').snapshotChanges();
}

addChallengeToActive(goal: Goal){
return new Promise<any>((resolve, reject) => {
  this.fireDatabase.database.ref('/goals/' + firebase.auth().currentUser.uid + '/' + goal.duration + goal.type)
                .set(goal).then(
                res => resolve(res),
                err => reject(err)
            );
});
}

}