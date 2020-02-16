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
    constructor(id?:string, activity?: number, type?:string){
        this.id = id || 'No Id';
        this.activity = activity|| 0;
        this.type = type || '';
    }

    
    id: string;
    activity: number;
    type: string;

    /**
     * Reconstruct the Goal from a firebase result
     *
     * Just append the name to the new object since it's used as a key in the firebase database
     *
     * @param name of the new goal
     * @param firebaseObject result of the firebase query
     */
    static fromFirebaseObject(id, firebaseObject: any) {

        if(firebaseObject.weeklyModerate !== undefined || firebaseObject.weeklyVigorous !== undefined){
       
        var moderate = Goal.fromAnyObject(id, firebaseObject.weeklyModerate);

        var vigorous = Goal.fromAnyObject(id, firebaseObject.weeklyVigorous);
    
        return new GoalArray(id, moderate.current + (vigorous.current*2), 'weekly');
        }
        
    }
}
