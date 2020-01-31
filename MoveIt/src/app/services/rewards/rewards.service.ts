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
        return this.fireDatabase.database.ref('/trophyStatus/' + firebase.auth().currentUser.uid).set(trophies);
    }

    getWonTrophies() {
        return this.fireDatabase.list<string>('/trophyStatus/' + firebase.auth().currentUser.uid + '/won').valueChanges();
    }

    getAvailableTrophies() {
        return this.fireDatabase.list<string>('/trophyStatus/' + firebase.auth().currentUser.uid + '/available').valueChanges();
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
            const won = this.calculateTrophyStatus(trophy, activities, goalWins);
            if (won) {
                trophyStatus.won.push(trophy.id);
            } else {
                trophyStatus.available.push(trophy.id);
            }
        }
        console.log(trophyStatus);
        return this.setTrophies(trophyStatus);
    }

    calculateTrophyStatus(trophy: Trophy, activities: Array<Activity>, goalWins: object) {
        function mapToStartOf(date: Date, unit = 'day') {
            let result = new Date(date.getTime());
            if (unit === 'week') {
                const diff = result.getDate() - result.getDay();
                result = new Date(result.setDate(diff));
            }
            result.setHours(0, 0, 0, 0);
            return result.getTime();
        }

        function generateTicks(startDate: Date, steps: number, unit = 'day') {
            const result = [];
            result.push(mapToStartOf(startDate, unit));

            let subtractor = 1000 * 60 * 60 * 24;
            if (unit === 'week') {
                subtractor *= 7;
            }

            for (let i = 1; i < steps; i++) {
                result.push(new Date(startDate.getTime() - subtractor).getTime());
            }

            return result;
        }

        function getTickResults(ticks: Array<number>, collection: Array<number>) {
            const result = new Map();
            for (const tick of ticks) {
                result.set(tick, 0);
            }
            for (const element of collection) {
                const previous = result.get(element);
                result.set(element, previous + 1);
            }
            return result;
        }

        for (const condition of trophy.conditions) {
            // Calculate time slots
            console.log(condition);
            if (condition.time.unit === 'day' || condition.time.unit === 'week') {
                const ticks = generateTicks(new Date(), condition.time.number, condition.time.unit);
                console.log(ticks);
                for (const requirement of condition.requirements) {
                    let targetCollection: Array<number>;
                    if (requirement.type === 'goal') {
                        targetCollection = goalWins[requirement.expression]
                            .map(element => mapToStartOf(new Date(element), condition.time.unit));
                    } else if (requirement.type === 'activity') {
                        targetCollection = activities.map(activity => mapToStartOf(activity.endTime, condition.time.unit));
                    } else {
                        console.log('unknown trophy characteristic condition');
                        return false;
                    }
                    const tickResults = getTickResults(ticks, targetCollection);
                    console.log(tickResults);
                    if (Array.from(tickResults.values()).filter(frequency => frequency < requirement.amount).length > 0) {
                        console.log(requirement);
                        return false;
                    }

                    // TODO check modifier (e.g. consecutive wins)
                }
            } else {
                console.log('unknown trophy time condition');
                return false;
            }
        }
        return true;
    }

    winTrophy(trophyID: string) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/trophyStatus/' + firebase.auth().currentUser.uid).once('value').then(
                trophiesSnapshot => {
                    const trophies = trophiesSnapshot.val();
                    if (Array.isArray(trophies.available) && Array.isArray(trophies.won)) {
                        if (trophies.won.indexOf(trophyID) === -1) {
                            trophies.available = trophies.available.filter(trophy => trophy !== trophyID);
                            trophies.won.push(trophyID);
                            this.fireDatabase.database.ref('/trophyStatus/' + firebase.auth().currentUser.uid).set(trophies).then(
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
