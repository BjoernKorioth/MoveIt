import {Goal} from './goal';
import { Challenge } from './challenge';

interface FireBaseObject {
    id: string;
    won: any;
}

export class ChallengesArray {

    /**
     * Constructor to create Goal
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?:string, wonObject ?: any){
        this.id = id || 'No Id';
        this.won = new Array();
        for(var key in wonObject){
            this.won.push(wonObject[key]);
        }
    }

    
    id: string;
    won: Array<any>;

    /**
     * Reconstruct the Goal from a firebase result
     *
     * Just append the name to the new object since it's used as a key in the firebase database
     *
     * @param name of the new goal
     * @param firebaseObject result of the firebase query
     */
    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        // @ts-ignore TS2339
        return new ChallengesArray(
            id || '',
            firebaseObject.won || {},
        );
    }
}
