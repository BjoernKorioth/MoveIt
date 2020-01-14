interface FireBaseObject {
    id: string;
    current: number;
    duration: string;
    target: number;
    type: string;
}


export class Goal {

    id: string;
    current: number;
    duration: string;
    target: number;
    type: string;


        /**
     * Constructor to create Goal
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, current?: number, duration?: string, target?: number,type?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.current = current || 0;
        this.duration = duration || 'Not set';
        this.target = target ||  100;
        this.type = type || 'Moderate';
    }


        /**
     * Creates an Information object from a firebase query
     *
     * This basically reconstructs the date from the date string
     *
     * @param id id of the activity
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        // @ts-ignore TS2339
        return new Information(
            id || '',
            firebaseObject.current || 0,
            firebaseObject.duration || 'Not set',
            firebaseObject.target || 0,
            firebaseObject.type || 'Moderate'
        );
    }

    /**
     * Converts the information to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            id: this.id,
            current: this.current,
            duration: this.duration,
            target: this.target,
            type: this.type
        };
    }

}