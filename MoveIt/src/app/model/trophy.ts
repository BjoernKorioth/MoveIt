interface FireBaseObject {
    id: string;
    description: string;
    // endTime: string;
    // price: string;
    // startTime: string;
    title: string;
}

export class Trophy {

    /**
     * Constructor to create Activity
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, description?: string, title?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.description = description || 'You get this trophy for winning 10 times a daily goal.';
        // this.endTime = endTime || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        // this.price = price || '10$ amazon gift card';
        // this.startTime = startTime || new Date(2019, 0O5, 0O5, 17, 55, 42, 0);
        this.title = title || '10 Daily Goals';
    }

    static defaultTrophies = [
        new Trophy('win-a-goal', 'Win one of your goals', 'Win a goal'),
        new Trophy('win-two-goals', 'Win two of your goals', 'Win two goals')
    ];
    id: string;
    description: string;
    title: string;

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
        return new Activity(
            id || '',
            firebaseObject.description || '',
            firebaseObject.title || ''
        );
    }

    /**
     * Converts the activity to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            description: this.description,
            title: this.title
        };
    }
}
