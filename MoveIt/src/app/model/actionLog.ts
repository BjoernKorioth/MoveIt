interface FirebaseObject {
    action: string;
    startTime: number;
    endTime: number;
    object: string;
    oldValue: number;
    newValue: number;
}

export class ActionLog {

    /**
     * Constructor to create ActionLog
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(action?: string, startTime?: Date, endTime?: Date, object?: string, oldValue?: number, newValue?: number) {
        // Each parameter is optional, if it's not there, set the default value
        this.action = action || '';
        this.startTime = startTime || new Date();
        this.endTime = endTime || new Date();
        this.object = object || '';
        this.oldValue = oldValue || 0;
        this.newValue = newValue || 0;
    }

    static actions = ['adjust-goal'];
    action: string;
    startTime: Date;
    endTime: Date;
    object: string;
    oldValue: number;
    newValue: number;

    /**
     * Reconstruct the ActionLog from a firebase result
     *
     * Just convert the date back to a Date object
     *
     * @param firebaseObject result of the firebase query
     */
    static fromFirebaseObject(firebaseObject: FirebaseObject) {
        return new ActionLog(
            firebaseObject.action,
            new Date(firebaseObject.startTime),
            new Date(firebaseObject.endTime),
            firebaseObject.object,
            firebaseObject.oldValue,
            firebaseObject.newValue);
    }

    /**
     * Prepare for upload to firebase
     *
     * Convert the Dates to numbers
     *
     */
    toFirebaseObject() {
        return {
            action: this.action,
            startTime: this.startTime.getTime(),
            endTime: this.endTime.getTime(),
            object: this.object,
            oldValue: this.oldValue,
            newValue: this.newValue
        };
    }
}
