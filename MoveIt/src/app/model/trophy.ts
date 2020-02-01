interface FireBaseObject {
    id: string;
    description: string;
    // endTime: string;
    // price: string;
    // startTime: string;
    title: string;
    conditions: Array<Condition>;
}

interface Condition {
    time: { unit: string, number: number };
    requirements: Array<Requirement>;
}

interface Requirement {
    type: string;
    expression: string;
    amount: number;
    modifier: string;
}

export class Trophy {

    /**
     * Constructor to create Trophy
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, description?: string, title?: string, conditions?: Array<Condition>) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.description = description || 'You get this trophy for winning 10 times a daily goal.';
        // this.endTime = endTime || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        // this.price = price || '10$ amazon gift card';
        // this.startTime = startTime || new Date(2019, 0O5, 0O5, 17, 55, 42, 0);
        this.title = title || '10 Daily Goals';
        this.conditions = conditions || [];
    }

    static conditions1 = [
        {
            time: {unit: 'week', number: 1},
            requirements: [
                {
                    type: 'goal',
                    expression: 'dailyModerate',
                    amount: 7,
                    modifier: 'consecutive'
                },
                {
                    type: 'goal',
                    expression: 'dailyVigorous',
                    amount: 7,
                    modifier: 'consecutive'
                },
                {
                    type: 'goal',
                    expression: 'dailyWeight',
                    amount: 7,
                    modifier: 'consecutive'
                },
            ]
        }
    ];
    static conditions2 = [
        {
            time: {unit: 'week', number: 1},
            requirements: [{
                type: 'activity',
                expression: '',
                amount: 7,
                modifier: ''
            }]
        }
    ];
    static conditions3 = [
        {
            time: {unit: 'day', number: 1},
            requirements: [{
                type: 'goal',
                expression: 'dailyWeight',
                amount: 2,
                modifier: ''
            }]
        }
    ];
    static defaultTrophies = [
        new Trophy('perfect-week', 'Win all your daily goals each day for a week', 'Perfect Week', Trophy.conditions1),
        new Trophy('7-activity-week', 'Complete 7 physical activities in one week', '7 Activity Week', Trophy.conditions2),
        new Trophy('2-weight-goals', 'Win your weight goal twice', '2 weight goals', Trophy.conditions3)
    ];
    id: string;
    description: string;
    title: string;
    conditions: Array<Condition>;

    /**
     * Creates an Trophy object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the trophy
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        return new Trophy(
            id || '',
            firebaseObject.description || '',
            firebaseObject.title || '',
            firebaseObject.conditions || []
        );
    }

    /**
     * Converts the trophy to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            description: this.description,
            title: this.title,
            conditions: this.conditions
        };
    }
}
