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

    static perfectWeek1 = [
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
                }
            ]
        }
    ];
    static perfectWeek2 = [
        {
            time: {unit: 'week', number: 1},
            requirements: [
                {
                    type: 'goal',
                    expression: 'dailyWeight',
                    amount: 7,
                    modifier: 'consecutive'
                }
            ]
        }
    ];
    static activityWeek = [
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
    static moderateStreek = [
        {
            time: {unit: 'day', number: 10},
            requirements: [{
                type: 'goal',
                expression: 'dailyModerate',
                amount: 1,
                modifier: ''
            }]
        }
    ];
    static weightStreek = [
        {
            time: {unit: 'week', number: 2},
            requirements: [{
                type: 'goal',
                expression: 'weeklyVigorous',
                amount: 1,
                modifier: ''
            }]
        }
    ];
    static defaultTrophies = [
        new Trophy('perfect-activity-week', 'Win all your daily activity goals each day for a week',
            'Perfect Activity Week', Trophy.perfectWeek1),
        new Trophy('perfect-weight-week', 'Win all your daily weight training goals each day for a week',
            'Perfect Weight Training Week', Trophy.perfectWeek2),
        new Trophy('7-activity-week', 'Complete 7 physical activities in one week',
            '7 Activity Week', Trophy.activityWeek),
        new Trophy('daily-goal-streek', 'You\'re on a streek of 10 for your daily moderate activity goal',
            '10 Streek Moderate Activity', Trophy.moderateStreek),
        new Trophy('weekkly-goal-streek', 'You\'re on a streek of 2 for your weekly vigorous activity goal',
            '2 Streek Vigorous Activity', Trophy.weightStreek)
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
