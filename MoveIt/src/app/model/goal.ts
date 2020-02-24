interface FirebaseObject {
    current: number;
    duration: string;
    history: Array<object>;
    target: number;
    type: string;
    relative: number;
}

export class Goal {

    /**
     * Constructor to create Goal
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */


    constructor(name?: string, duration?: string, type?: string, target?: number, current?: number, history?: Array<object>) {
        // Each parameter is optional, if it's not there, set the default value
        this.name = name || '';
        this.current = current || 0;
        this.duration = duration || 'daily';
        this.history = history || [];
        this.target = target || 0;
        this.type = type || 'vigorous';
        this.relative = (current / target) || 0;
    }

    static durations = ['daily', 'weekly'];
    static types = ['moderate', 'vigorous', 'weight training'];
    static defaultGoals: Array<Goal> = [
        new Goal('dailyModerate', 'daily',  'moderate',  60,  0),
        new Goal('weeklyModerate',   'weekly',  'moderate',  150,  0),
        new Goal('dailyVigorous',    'daily',  'vigorous',  20,  0),
        new Goal('weeklyVigorous',    'weekly',  'vigorous',  75,  0),
        new Goal('dailyWeight',    'daily',  'weight training',  30,  0),
        new Goal('weeklyWeight',    'weekly',  'weight training',  120,  0)
    ];
    name: string;
    current: number;
    duration: string;
    history: Array<object>;
    target: number;
    type: string;
    relative: number;

    /**
     * Reconstruct the Goal from a firebase result
     *
     * Just append the name to the new object since it's used as a key in the firebase database
     *
     * @param name of the new goal
     * @param firebaseObject result of the firebase query
     */
    static fromFirebaseObject(name, firebaseObject: FirebaseObject) {
        // console.log(firebaseObject);

        return new Goal(name, firebaseObject.duration,
            firebaseObject.type, firebaseObject.target, firebaseObject.current, firebaseObject.history);

    }

    static fromAnyObject(name, firebaseObject: any) {
        // console.log(firebaseObject);
        return new Goal(name, firebaseObject.duration,
            firebaseObject.type, firebaseObject.target, firebaseObject.current, firebaseObject.history);
    }

    /**
     * Prepare for upload to firebase
     *
     * Remove the name as it's used as a key
     *
     */
    toFirebaseObject() {
        const copy = {...this};
        delete copy.name;
        return copy;
    }
}
