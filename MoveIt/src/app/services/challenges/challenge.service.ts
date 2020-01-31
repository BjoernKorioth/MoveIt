import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Challenge} from '../../model/challenge';

import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    /**
     * Creates a new activity in firebase from an activity objects
     *
     * @param challenge an existing activity object
     */
    createChallenge(challenge: Challenge) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/challenges/').push(challenge.toFirebaseObject()).then(
                newReference => {
                    challenge.id = newReference.key;
                    resolve(challenge);
                },
                err => reject(err)
            );
        });
    }

    editChallenge(challenge: Challenge) {
        return firebase.database().ref('/challenges/' + challenge.id).set(challenge.toFirebaseObject());
    }


    getAllAvailableChallenges() {
        return this.fireDatabase.list<Challenge>('challenges').valueChanges();
    }

    getAllUserActiveChallenges() {
        return this.fireDatabase.list<Challenge>('/users/' + firebase.auth().currentUser.uid + '/challengesActive').valueChanges();
    }

    getListOfParticipants(challenge: Challenge) {
        return new Promise<any>((resolve, reject) => {

            this.fireDatabase.database.ref('/challenges/' + challenge.id).child('participants').once('value')
                .then(
                    res => resolve(res),
                    err => reject(err)
                );
        });
    }

    getAllChallenges() {
        const ref = this.fireDatabase.list<any>('/challenges/');
        // Retrieve an array, but with its metadata. This is necesary to have the key available
        // An array of Goals is reconstructed using the fromFirebaseObject method
        return ref.snapshotChanges().pipe(
            map(challenges => challenges.map(goalPayload => (Challenge.fromFirebaseObject(goalPayload.key, goalPayload.payload.val())))));

    }

    addChallengeToActive(challenge: Array<Challenge>) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).child('challengesActive')
                .set(challenge).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    registerOnChallenge(challenge: Challenge) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/challenges/' + challenge.id).child('participants')
                .child(firebase.auth().currentUser.uid).set(firebase.auth().currentUser.uid).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    deRegisterOnChallenge(challenge: Challenge) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/challenges/' + challenge.id).child('participants')
                .child(firebase.auth().currentUser.uid).remove().then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    finishChallenge(challenge:Challenge){
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/challenges/' + challenge.id).child('finished')
                .set('true').then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

}
