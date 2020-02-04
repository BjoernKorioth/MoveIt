interface FirebaseObject {
    view: string;
    startTime: number;
    endTime: number;
    completeTime: number;
}

export class ViewLog {

    /**
     * Constructor to create ViewLog
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(view?: string, startTime?: Date, endTime?: Date) {
        // Each parameter is optional, if it's not there, set the default value
        this.view = view || '';
        this.startTime = startTime || new Date();
        this.endTime = endTime || new Date();
        this.completeTime = this.endTime.getTime() - this.startTime.getTime();
    }

    static views = ['menu', 'dashboard', 'progress', 'add-activity', 'information', 'socialfeed',
        'rewards', 'trophies', 'challenges', 'leaderboard', 'profile'];
    view: string;
    startTime: Date;
    endTime: Date;
    completeTime: number;

    /**
     * Reconstruct the ViewLog from a firebase result
     *
     * Just convert the date back to a Date object
     *
     * @param firebaseObject result of the firebase query
     */
    static fromFirebaseObject(firebaseObject: FirebaseObject) {
        return new ViewLog(firebaseObject.view, new Date(firebaseObject.startTime), new Date(firebaseObject.endTime));
    }

    /**
     * Prepare for upload to firebase
     *
     * Convert the Dates to numbers
     *
     */
    toFirebaseObject() {
        return {
            view: this.view,
            startTime: this.startTime.getTime(),
            endTime: this.endTime.getTime(),
            completeTime: this.endTime.getTime() - this.startTime.getTime()
        };
    }
}
