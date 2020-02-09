interface FireBaseObject {
    id: string;
    won: any;
}

export class TrophyArray {

    /**
     * Constructor to create Activity
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, wonObject?: any) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        // this.endTime = endTime || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        // this.price = price || '10$ amazon gift card';
        // this.startTime = startTime || new Date(2019, 0O5, 0O5, 17, 55, 42, 0);
        this.won = new Array();

        for(var key in wonObject){
            this.won.push(wonObject[key]);
        }
    }

    id: string;
    won: Array<any>

    /**
     * Creates an Activity object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the activity
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        // @ts-ignore TS2339
        return new TrophyArray(
            id || '',
            firebaseObject.won || '',
        );
    }
}
