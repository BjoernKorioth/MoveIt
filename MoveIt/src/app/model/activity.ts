export class Activity {
    id: string;
    distance: object;
    endTime: Date;
    intensity: string;
    startTime: Date;
    type: string;

    /**
     * Constructor to create Activity
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, distance?: object, endTime?: Date, intensity?: string, startTime?: Date, type?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.distance = distance || {unit: 'km', value: 12};
        this.endTime = endTime || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        this.intensity = intensity || 'moderate';
        this.startTime = startTime || new Date(2019, 0O5, 0O5, 17, 55, 42, 0);
        this.type = type || 'running';
    }

    /**
     * Creates an Activity object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the activity
     * @param firebaseObject result of the query
     */
    static fromFireBaseObject(id: string, firebaseObject: object) {
        // @ts-ignore
        return new Activity(
            id || '',
            firebaseObject.distance || {},
            new Date(firebaseObject.endTime) || new Date(),
            firebaseObject.intensity || '',
            new Date(firebaseObject.startTime) || new Date(),
            firebaseObject.type || ''
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
            endTime: this.endTime.toDateString(),
            intensity: this.intensity,
            startTime: this.startTime.toDateString(),
            type: this.type
        };
    }
}
