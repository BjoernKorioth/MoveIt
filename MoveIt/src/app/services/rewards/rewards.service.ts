import {Injectable} from '@angular/core';
import {Trophy} from '../../model/trophy';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import {Activity} from '../../model/activity';

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

        return this.setTrophies(trophyStatus);
    }

    setTrophies(trophies) {
        return this.fireDatabase.database.ref('/trophies/' + firebase.auth().currentUser.uid).set(trophies);
    }

    getWonTrophies() {
        return this.fireDatabase.list<string>('/trophies/' + firebase.auth().currentUser.uid + '/won').valueChanges();
    }

    getAvailableTrophies() {
        return this.fireDatabase.list<string>('/trophies/' + firebase.auth().currentUser.uid + '/available').valueChanges();
    }

    getAllTrophies() {
        return Trophy.defaultTrophies;
    }

    updateTrophies(activities: Array<Activity>, goalWins: object) {
        const trophyStatus = {
            available: [],
            won: []
        };

        // Use only trophies that aren't won yet?
        for (const trophy of this.getAllTrophies()) {
            const won = this.calculateTrophyStatus(activities, goalWins);
            if (won) {
                trophyStatus.won.push(trophy.id);
            } else {
                trophyStatus.available.push(trophy.id);
            }
        }

        return this.setTrophies(trophyStatus);
    }

    calculateTrophyStatus(activities: Array<Activity>, goalWins: object) {
        // TODO implement this
        return true;
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
