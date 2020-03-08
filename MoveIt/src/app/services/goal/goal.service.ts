import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Goal} from '../../model/goal';
import * as firebase from 'firebase/app';
import {Activity} from '../../model/activity';
import {GoalArray} from '../../model/goalArray';
import {map} from 'rxjs/operators';
import {PostService} from '../post/post.service';
import {Post} from '../../model/post';

@Injectable({
    providedIn: 'root'
})
export class GoalService {

    constructor(private fireDatabase: AngularFireDatabase, private postService: PostService) {
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
            // newHistoryEntry[new Date().setDate(new Date().getDate() - 23)] = goal.target;
            newHistoryEntry[new Date().getTime()] = goal.target;

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

    getGoalsFromUser(userId: string) {
        const ref = this.fireDatabase.list<Goal>('/goals/' + userId);
        // Retrieve an array, but with its metadata. This is necesary to have the key available
        // An array of Goals is reconstructed using the fromFirebaseObject method
        return ref.snapshotChanges().pipe(
            map(goals => goals.map(goalPayload => (Goal.fromFirebaseObject(goalPayload.key, goalPayload.payload.val())))));
    }

    getAllOtherAvailableGoals() {
        return this.fireDatabase.list<GoalArray>('/goals/').snapshotChanges().pipe(
            map(goals => goals.map(goalPayload => (GoalArray.fromFirebaseObject(goalPayload.key, goalPayload.payload.val())))));
    }

    /**
     * Get all goalsWins of the current user
     */
    getGoalWinsName() {
        // return this.fireDatabase.list<number>('/wins/' + firebase.auth().currentUser.uid).valueChanges();

        const ref = this.fireDatabase.list<number>('/wins/' + firebase.auth().currentUser.uid);
        // Retrieve an array, but with its metadata. This is necesary to have the key available
        // An array of Goals is reconstructed using the fromFirebaseObject method
        return ref.snapshotChanges().pipe(
            map(goals => goals.map(goalPayload => (goalPayload.key))));
    }

    getGoalWins() {
        //   return ref.snapshotChanges().pipe(
        //     map(goals => goals.map(goalPayload => (Goal.fromFirebaseObject(goalPayload.key, goalPayload.payload.val())))));


        return this.fireDatabase.list<number>('/wins/' + firebase.auth().currentUser.uid).valueChanges();
        //  return ref.snapshotChanges().pipe(
        //    map(wonGoals => wonGoals.map(wonPayload => (Date(wonPayload.key, wonPayload.payload.val()))));

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
                goal.current = this.calculateGoalProgress(goal, activities);
                this.updateGoal(goal).then(
                    res => console.log(res),
                    err => reject(err)
                );

                if (goal.current >= goal.target) {
                    this.winGoal(goal).then(
                        res => console.log(res),
                        err => reject(err)
                    );
                }
            }
            resolve('Successfully updated goals');
        });
    }

    /**
     * Calculate the progress of a given goal
     *
     * @param goal to calculate the progress for
     * @param activities list of activities to base the progress on
     */
    calculateGoalProgress(goal: Goal, activities: Array<Activity>) {
        const startDate = this.getStartOf(goal.duration === 'weekly');

        // Filter the activities based on the goals type (e.g. 'moderate') and duration (e.g. 'weekly')
        const filteredActivities = this.filterActivities(activities, goal.type, startDate);

        // Get the duration for each activity
        const times = filteredActivities.map((activity) => activity.getDuration());

        // Check if there are elements in the array, that passed the filtering
        if (times.length > 0) {
            // Return the sum of the durations.
            return times.reduce((accumulator, currentValue) => accumulator + currentValue);
        } else {
            return 0;
        }
    }

    getStartOf(week = false) {
        let startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Set to start of the day (= 0:00:00)
        if (week) {
            // If it's a weekly goal, set to start of the week (week starts on Sunday)
            const startOfWeek = startDate.getDate() - startDate.getDay();
            startDate = new Date(startDate.setDate(startOfWeek));
        }
        return startDate;
    }

    /**
     * Win a goal and add current time to the list of wins
     *
     * @param goal to be won
     */
    winGoal(goal: Goal) {
        return new Promise<any>((resolve, reject) => {
            // Get the current list of wins
            this.fireDatabase.database.ref('/wins/' + firebase.auth().currentUser.uid + '/' + goal.name)
                .once('value').then(
                (winsSnapshot) => {
                    let wins = winsSnapshot.val();
                    let createPost = true;
                    if (Array.isArray(wins)) {
                        // If the list exists, check if the goals was already won today
                        const lastWin = new Date(wins.slice(-1)[0]);
                        const startOfPeriod = this.getStartOf(goal.duration === 'weekly');
                        if (lastWin.getTime() >= startOfPeriod.getTime()) {
                            resolve(goal.name + ' goal was already won');
                            createPost = false;
                        } else {
                            // If not, append it to the wins list
                            wins.push((new Date()).getTime());
                        }

                    } else {
                        // If it doesn't exist, create a new array with the current win
                        wins = [(new Date()).getTime()];
                    }
                    if (createPost) {
                        this.fireDatabase.database.ref('/wins/' + firebase.auth().currentUser.uid + '/' + goal.name)
                            .set(wins).then(
                            (res) => {
                                const post = new Post();
                                post.content = 'Hooray, I\'ve achieved my ' + goal.duration + ' goal for ' + goal.type;
                                this.postService.createPost(post).then(
                                    () => resolve(res),
                                    err => reject(err)
                                );
                            },
                            (err) => reject(err));
                    }
                },
                (err) => reject(err));
        });
    }

    /**
     * Filter an array of activities based on time and intensity
     *
     * The output is an array of activities, where all items match the given intensity and their endTime lies between
     * the fromDate and the untilDate
     *
     * @param activities array of activities
     * @param intensity intensity to filter for (e.g. 'moderate')
     * @param fromDate earliest endTime of an activity
     * @param untilDate latest endTime of an activity
     */
    filterActivities(activities: Array<Activity>, intensity: string, fromDate: Date = new Date(0), untilDate: Date = new Date()) {
        fromDate.setHours(0, 0, 0);
        untilDate.setHours(23, 59, 59);
        return activities.filter((activity: Activity) => {
            if (activity.intensity !== intensity) {
                return false;
            }

            if (activity.endTime <= fromDate) {
                return false;
            }

            if (activity.endTime >= untilDate) {
                return false;
            }

            return true;
        });
    }
}
