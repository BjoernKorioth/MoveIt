interface FirebaseObject {
    notification: string;
    time: number;
    response: string;
}

export class Reaction {

    /**
     * Constructor to create Reaction
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(notification?: string, response?: string, time?: Date) {
        // Each parameter is optional, if it's not there, set the default value
        this.notification = notification || '';
        this.time = time || new Date();
        this.response = response || '';
    }

    static actions = ['adjust-goal'];
    notification: string;
    time: Date;
    response: string;

    /**
     * Reconstruct the Reaction from a firebase result
     *
     * Just convert the date back to a Date object
     *
     * @param firebaseObject result of the firebase query
     */
    static fromFirebaseObject(firebaseObject: FirebaseObject) {
        return new Reaction(
            firebaseObject.notification,
            firebaseObject.response,
            new Date(firebaseObject.time)
        );
    }

    /**
     * Prepare for upload to firebase
     *
     * Convert the Dates to numbers
     *
     */
    toFirebaseObject() {
        return {
            notification: this.notification,
            time: this.time.getTime(),
            response: this.response
        };
    }
}
