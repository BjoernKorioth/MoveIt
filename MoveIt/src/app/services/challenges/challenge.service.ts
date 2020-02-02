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
     * Creates a new challenge in firebase from an activity objects
     *
     * @param challenge an existing challenge object
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

    /**
     * this is needed to initially get all available challenges
     */
    getAllAvailableChallenges() {
        return this.fireDatabase.list<Challenge>('challenges').valueChanges();
    }

    /**
     * this is necessary in order to get all own active challenges to sort it in the frontend then
     */
    /**getAllUserActiveChallenges() {
        return this.fireDatabase.list<Challenge>('/users/' + firebase.auth().currentUser.uid + '/challengesActive').valueChanges();
    }*/

    getAllUserActiveChallenges() {
        const ref = this.fireDatabase.list<String>('/users/' + firebase.auth().currentUser.uid + '/challengesActive');
        // Retrieve an array, but with its metadata. This is necesary to have the key available
        // An array of Goals is reconstructed using the fromFirebaseObject method
        return ref.snapshotChanges().pipe(
            map(challenges => challenges.map(goalPayload => goalPayload.key)));
    }


    /**
     * this methods returns the participants node as a object which is then converted to an array in order to determine it length
     * @param challenge identify a specific challenge and its participants
     */
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


    /**
     * this method adds the challenge to the users array which is necessary to determine the participated challenges
     * @param challenge identify the specific challenge which the user wants to participate
     */
    /*addChallengeToActive(challenge: Array<Challenge>) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).child('challengesActive')
                .set(challenge).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }*/


    addChallengeToActive(challenge: Challenge) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).child('challengesActive')
                .child(challenge.id).set('true').then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    removeChallengeFromActive(challenge: Challenge) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).child('challengesActive')
                .child(challenge.id).remove().then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * increment the participants array in order to show it to the others
     * @param challenge identify challenge
     */
    registerOnChallenge(challenge: Challenge) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/challenges/' + challenge.id).child('participants')
                .child(firebase.auth().currentUser.uid).set(firebase.auth().currentUser.uid).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * decrement the participants array in order to show it to the others
     * @param challenge identify challenge
     */
    deRegisterOnChallenge(challenge: Challenge) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/challenges/' + challenge.id).child('participants')
                .child(firebase.auth().currentUser.uid).remove().then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * finish the challenge, this method is called from the admin dashboard in order to disable further registration
     * @param challenge identify the challenge
     */
    finishChallenge(challenge:Challenge){
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/challenges/' + challenge.id).child('finished')
                .set('true').then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * after the finish, the researcher needs to manually determine the challenge winner
     * @param challenge the challenge to identify
     * @param uid the uid who wins this challenge
     */
    setWinner(challenge:Challenge, uid: string){
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/challenges/' + challenge.id).child('winner')
                .set(uid).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

}
