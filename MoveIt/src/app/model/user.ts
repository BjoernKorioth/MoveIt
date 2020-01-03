export class User {
    id: string;
    name: string;
    challengesActive: Array<any>;
    challengesWon: Array<any>;
    group: number;
    trophiesWon: Array<any>;
    type: string;

    /**
     * Constructor to create User object
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, name?: string, challengesActive?: Array<any>, challengesWon?: Array<any>, group?: number,
                trophiesWon?: Array<any>, type?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '-1';
        this.name = name || 'No username';
        this.challengesActive = challengesActive || [];
        this.challengesWon = challengesWon || [];
        this.group = group || -1;
        this.trophiesWon = trophiesWon || [];
        this.type = type || 'user';
    }

    /**
     * toFireBaseObject
     *
     * Converts the User object to a firebase object. It basically just replaces the arrays with a JSON string.
     * We could also hand over the whole user object to firebase, but then it would use the arrays as subelements.
     * If we substitute the arrays with their string representation, firebase will just store them as a string as well
     * and not try to parse them.
     *
     */
    toFirebaseObject() {

        return {
            name: this.name,
            challengesActive: JSON.stringify(this.challengesActive),
            challengesWon: JSON.stringify(this.challengesWon),
            group: this.group,
            trophiesWon: JSON.stringify(this.trophiesWon),
            type: this.type
        };
    }
}
