import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Goal} from '../../model/goal';
import * as firebase from 'firebase/app';

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
     * Adjust a goal by setting a new target
     *
     * @param name of the goal
     * @param target new target value
     */
    adjustGoal(name: string, target: number) {
      return new Promise<any>((resolve, reject) => {
        this.fireDatabase.database.ref('/goals/' + firebase.auth().currentUser.uid + '/' + name + '/target').set(target).then(
            res => resolve(res),
            // TODO create log for tracking
            err => reject(err)
        );
      });
    }

    /**
     * Get all goals of the current user
     */
    getGoals() {
        return this.fireDatabase.list<Goal>('/goals/' + firebase.auth().currentUser.uid).valueChanges();
    }
}
