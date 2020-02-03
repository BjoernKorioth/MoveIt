interface FireBaseObject {
    id: string;
    distance: object;
    endTime: Date;
    intensity: string;
    startTime: Date;
    type: string;
}

export class Activity {
    startDateIso: string;
    startTimeIso: string;
    minutes: number;

    /**
     * Constructor to create Activity
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, distance?: object, endTime?: Date, intensity?: string, startTime?: Date, type?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.distance = distance || {unit: 'km', value: 0};
        this.endTime = endTime || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        this.intensity = intensity || 'moderate';
        this.startTime = startTime || new Date(2019, 0O5, 0O5, 17, 55, 42, 0);
        this.type = type || 'running';
    }

    static types = ['basketball', 'biking', 'dancing','handball','football','running', 'swimming', 'volleyball', 'walking', 'other'];
    static intensities = ['moderate', 'vigorous', 'weight training'];
    id: string;
    distance: object;
    endTime: Date;
    intensity: string;
    startTime: Date;
    type: string;

    /**
     * Creates an Activity object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the activity
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(id: string, activity: Activity) {// firebaseObject: FireBaseObject) {
        // @ts-ignore TS2339        
        return new Activity(
            id,
            activity.distance,            
            new Date(activity.endTime) || new Date(),
            activity.intensity || '',
            new Date(activity.startTime) || new Date(), // new Date(firebaseObject.startTime) || new Date(),
            activity.type || ''
        );
    }

    /**
     * Converts the activity to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            distance: this.distance,
            endTime: this.endTime.getTime(),
            intensity: this.intensity,
            startTime: this.startTime.getTime(),
            type: this.type
        };
    }

    /**
     * Returns the duration of the activity in milliseconds
     */
    getDuration() {
        return Math.round((this.endTime.getTime() - this.startTime.getTime())/60000);
    }
}
