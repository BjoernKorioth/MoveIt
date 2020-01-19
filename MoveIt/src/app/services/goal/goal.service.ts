import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Goal} from '../../model/goal';
import * as firebase from 'firebase/app';
import {Activity} from '../../model/activity';
import {GoalArray} from '../../model/goalArray';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GoalService {

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    /**
     * Create a new goal
     *
     * @param goal Goal object to use
     */
    createGoal(goal: Goal) {
        return new Promise<any>((resolve, reject) => {
            // Use the name as the key
            this.fireDatabase.database.ref('/goals/' + firebase.auth().currentUser.uid + '/' + goal.name).set(goal.toFirebaseObject()).then(
                () => resolve(goal),
                err => reject(err)
            );
        });
    }

    /**
     * Initialize user goals
     *
     * This creates a new goal for every default goal given in model/Goal.ts
     * All the default values there will be used.
     *
     */
    initializeUserGoals() {
        return new Promise<any>((resolve, reject) => {
            for (const goal of Goal.defaultGoals) {
                this.createGoal(goal).then(
                    () => null,
                    err => reject(err)
                );
            }
            resolve('Successfully initialized goals');
        });
    }

    /**
     * Retrieve a goal given its name
     *
     * @param name of the goal
     */
    getGoal(name: string) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/goals/' + firebase.auth().currentUser.uid + '/' + name).once('value').then(
                goal => resolve(Goal.fromFirebaseObject(name, goal.val())),
                err => reject(err)
            );
        });
    }

    /**
     * Update a goal if you've made changes to it
     *
     * The goal name is read from the goal parameter
     * @param goal new goal with changes values
     */
    updateGoal(goal: Goal) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/goals/' + firebase.auth().currentUser.uid + '/' + goal.name).set(goal.toFirebaseObject()).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Adjust a goal by setting a new target
     *
     * @param goal the goal to be set to the new target value
     * @param target new target value
     */
    adjustGoal(goal: Goal, target: number) {
        return new Promise<any>((resolve, reject) => {
            // Create a new history entry with the current date as key and the previous target as value
            const newHistoryEntry = {};
            newHistoryEntry[new Date().toString()] = goal.target;

            goal.history.push(newHistoryEntry); // Add the value to the history
            goal.target = target; // Set the new target value

            this.updateGoal(goal).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Get all goals of the current user
     */
    getGoals() {
        const ref = this.fireDatabase.list<Goal>('/goals/' + firebase.auth().currentUser.uid);
        // Retrieve an array, but with its metadata. This is necesary to have the key available
        // An array of Goals is reconstructed using the fromFirebaseObject method
        return ref.snapshotChanges().pipe(
            map(goals => goals.map(goalPayload => (Goal.fromFirebaseObject(goalPayload.key, goalPayload.payload.val())))));
    }

    getAllOtherAvailableGoals(){
        return this.fireDatabase.list<GoalArray>('/goals/').snapshotChanges().pipe(
            map(goals => goals.map(goalPayload => (GoalArray.fromFirebaseObject(goalPayload.key, goalPayload.payload.val())))));
    }

    /**
     * Update all goals and set the new progress
     *
     * Recalculates the active minutes for each goal and updates the goals by setting the new progress value
     * @param goals list of goals to be updated
     * @param activities list of activities to measure the goals on
     */
    updateGoals(goals: Array<Goal>, activities: Array<Activity>) {
        return new Promise<any>((resolve, reject) => {
            for (const goal of goals) {
                goal.current += 5; // TODO replace with real goal adjustment
                this.updateGoal(goal).then(
                    res => console.log(res),
                    err => reject(err)
                );
            }
            resolve('Successfully updated goals');
        });
    }
}
