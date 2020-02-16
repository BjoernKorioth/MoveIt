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
        return this.fireDatabase.list<any>('/trophyStatus/' + firebase.auth().currentUser.uid + '/won').valueChanges();
    }

    getAvailableTrophies() {
        return this.fireDatabase.list<string>('/trophyStatus/' + firebase.auth().currentUser.uid + '/available').valueChanges();
    }

    getTrophy(id: string) {
        return Trophy.defaultTrophies.find(trophy => trophy.id === id);
    }

    getAllTrophies() {
        return Trophy.defaultTrophies;
    }

    getAllUserTrophies() {
        return this.fireDatabase.database.ref('/trophyStatus/' + firebase.auth().currentUser.uid).once('value');
    }

    /**
     * Update the trophies and determine if they are won or not
     *
     * @param activities list of all activities of the relevant user
     * @param goalWins list of goal wins of the relevant user
     */
    updateTrophies(activities: Array<Activity>, goalWins: object) {
        return this.getAllUserTrophies().then(
            trophyStatusSnapshot => {
                const trophyStatus = trophyStatusSnapshot.val();
                const newAvailable = [];
                if (!('won' in trophyStatus)) {
                    trophyStatus.won = [];
                }
                // Iterate over trophies
                // Use only trophies that aren't won yet?
                for (const trophyId of trophyStatus.available) {
                    const trophy = Trophy.defaultTrophies.find(element => element.id === trophyId);
                    // Determine for each trophy if it is won or not
                    const won = this.calculateTrophyStatus(trophy, activities, goalWins);
                    // Add it to the respective list
                    if (won) {
                        trophyStatus.won.push({id: trophy.id, time: (new Date()).getTime()});
                    } else {
                        newAvailable.push(trophy.id);
                    }
                }
                trophyStatus.available = newAvailable;
                // Update the trophies in the database
                return this.setTrophies(trophyStatus);
            },
            err => console.log(err)
        );
    }

    /**
     * Calculates for a trophy whether it is won or not
     *
     * @param trophy to determine the status for
     * @param activities list of user activities
     * @param goalWins list of user goal wins
     *
     * @returns boolean whether the trophy is won or not
     */
    calculateTrophyStatus(trophy: Trophy, activities: Array<Activity>, goalWins: object) {
        /**
         * Get the start of day or week, given a date object
         *
         * @param date for which to calculate the start
         * @param unit determines the start of what (day, week, ...)
         *
         * @returns start of unit in milliseconds
         */
        function mapToStartOf(date: Date, unit = 'day') {
            let start = new Date(date.getTime());
            if (unit === 'week') {
                // Set day to start of week
                const diff = start.getDate() - start.getDay();
                start = new Date(start.setDate(diff));
            }
            // Set time to start of day
            start.setHours(0, 0, 0, 0);
            return start.getTime();
        }

        /**
         * Generate series of timestamps based on some start date
         *
         * This generates a series of timestamps, starting at the given start date.
         * This could be for example the last three starts of week (e.g. last three Sundays), or the last two starts of
         * the day.
         *
         * @param startDate from where to count back the timestamps
         * @param steps how many steps to go back (e.g. 2, for 2 weeks)
         * @param unit size of the steps to go back (e.g. 'week', for 2 weeks)
         *
         * @returns ticks series of timestamps (in milliseconds) counting back the number of steps times the unit
         */
        function generateTicks(startDate: Date, steps: number, unit = 'day') {
            const ticks = [];
            // Initially, add the start that belongs to the start date (this is the first step, so to say)
            ticks.push(mapToStartOf(startDate, unit));

            let subtractor = 1000 * 60 * 60 * 24; // = one day
            if (unit === 'week') {
                subtractor *= 7; // = one week
            }

            // For each subsequent step, count back depending on the subtractor
            for (let i = 1; i < steps; i++) {
                ticks.push(new Date(startDate.getTime() - subtractor).getTime());
            }

            return ticks;
        }

        /**
         * Get the results for each tick, whether the collection contains entry for the tick
         *
         * @param ticks series of timestamps
         * @param collection series of entries
         *
         * @returns tickResults a Map containing each tick as a key and the frequency it appears in the collection as value
         */
        function getTickResults(ticks: Array<number>, collection: Array<number>) {
            const tickResults = new Map();
            for (const tick of ticks) {
                tickResults.set(tick, 0);
            }
            for (const element of collection) {
                const previous = tickResults.get(element);
                tickResults.set(element, previous + 1);
            }
            return tickResults;
        }

        // Iterate over each condition
        for (const condition of trophy.conditions) {
            if (condition.time.unit === 'day' || condition.time.unit === 'week') {
                // Generate ticks once, for each condition
                const ticks = generateTicks(new Date(), condition.time.number, condition.time.unit);

                // Iterate over the requirements
                for (const requirement of condition.requirements) {
                    let targetCollection: Array<number>;
                    if (requirement.type === 'goal') {
                        targetCollection = [];
                        if (requirement.expression in goalWins) {
                            targetCollection = goalWins[requirement.expression]
                                .map(element => mapToStartOf(new Date(element), condition.time.unit));
                        }
                    } else if (requirement.type === 'activity') {
                        targetCollection = activities.map(activity => mapToStartOf(activity.endTime, condition.time.unit));
                    } else {
                        console.log('unknown trophy characteristic condition');
                        return false;
                    }
                    // Count for every tick how many values there are in the collection
                    const tickResults = getTickResults(ticks, targetCollection);

                    // Check if there are ticks for which the counter is below the required amount
                    if (Array.from(tickResults.values()).filter(frequency => frequency < requirement.amount).length > 0) {
                        // If so, the requirement is not satisfied
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
        // If we iterated over every condition, and none returned false, all are satisfied and the trophy is won.
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


    winChallenge(challengeId: string, uid: string) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/challengesStatus/' + uid + '/won').child(challengeId).set(challengeId).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }
}
