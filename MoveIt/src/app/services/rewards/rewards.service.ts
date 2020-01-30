import {Injectable} from '@angular/core';
import {Trophy} from '../../model/trophy';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class RewardsService {

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    initializeTrophies() {
        const trophyIDs = [];
        for (const trophy of Trophy.defaultTrophies) {
            trophyIDs.push(trophy.id);
        }

        const trophyStatus = {
            available: trophyIDs,
            won: []
        };
        this.fireDatabase.database.ref('/trophies/' + firebase.auth().currentUser.uid).push(trophyStatus);
    }

    getWonTrophies() {
        return this.fireDatabase.list<string>('/trophies/' + firebase.auth().currentUser.uid + '/won').valueChanges();
    }

    getAvailableTrophies() {
        return this.fireDatabase.list<string>('/trophies/' + firebase.auth().currentUser.uid + '/available').valueChanges();
    }

    winTrophy(trophyID: string) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/trophies/' + firebase.auth().currentUser.uid).once('value').then(
                trophiesSnapshot => {
                    const trophies = trophiesSnapshot.val();
                    if (Array.isArray(trophies.available) && Array.isArray(trophies.won)) {
                        if (trophies.won.indexOf(trophyID) === -1) {
                            trophies.available = trophies.available.filter(trophy => trophy !== trophyID);
                            trophies.won.push(trophyID);
                            this.fireDatabase.database.ref('/trophies/' + firebase.auth().currentUser.uid).set(trophies).then(
                                res => resolve(res),
                                err => reject(err)
                            );
                        } else {
                            resolve('trophy was already won');
                        }
                    } else {
                        reject('Received available trophies in different format than array');
                    }
                },
                err => reject(err)
            );
        });
    }
}
