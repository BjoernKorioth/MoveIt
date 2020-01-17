import {Goal} from './goal';

interface FirebaseObject {
    id: string;
    goal: Goal;
}

export class GoalArray {

    /**
     * Constructor to create Goal
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?:string, goal?: Goal){
        this.id = id || 'No Id';
        this.goal = goal || new Goal();
    }

    
    id: string;
    goal: Goal;

    /**
     * Reconstruct the Goal from a firebase result
     *
     * Just append the name to the new object since it's used as a key in the firebase database
     *
     * @param name of the new goal
     * @param firebaseObject result of the firebase query
     */
    static fromFirebaseObject(id, firebaseObject: any) {

        if(firebaseObject.weeklyModerate !== undefined){
        //console.log(firebaseObject.weeklyModerate);

        var goal = Goal.fromAnyObject(id, firebaseObject.weeklyModerate);
        
        console.log(goal);
        
        return new GoalArray(id, goal);
        }
        
    }
}
