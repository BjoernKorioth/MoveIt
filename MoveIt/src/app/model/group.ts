interface FireBaseObject {
    name: string;
    featureVector: string;
}

export class Group {

    /**
     * Constructor to create Group object
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, name?: string, featureVector?: Array<any>) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '-1';
        this.name = name || 'No groupname';
        this.featureVector = featureVector || ['Leaderboard', 'Social', 'Rewards'];
    }

    static feautres = ['Leaderboard', 'Social', 'Rewards'];
    id: string;
    name: string;
    featureVector: Array<any>;

    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        return new Group(
            id || '-1',
            firebaseObject.name || 'Test Account',
            JSON.parse(firebaseObject.featureVector) || ['Leaderboard', 'Social', 'Rewards'],
        );
    }

    enableFeature(feature: string) {
        if (feature in Group.feautres) {
            if (!(feature in this.featureVector)) {
                this.featureVector.push(feature);
            }
        } else {
            console.log('invalid feature');
        }
    }

    disableFeature(feature: string) {
        if (feature in Group.feautres) {
            if (feature in this.featureVector) {
                this.featureVector.filter(element => element !== feature);
            }
        } else {
            console.log('invalid feature');
        }
    }

    /**
     * toFireBaseObject
     *
     * Converts the Group object to a firebase object. It basically just replaces the arrays with a JSON string.
     * We could also hand over the whole group object to firebase, but then it would use the arrays as subelements.
     * If we substitute the arrays with their string representation, firebase will just store them as a string as well
     * and not try to parse them.
     *
     */
    toFirebaseObject() {
        return {
            name: this.name,
            featureVector: JSON.stringify(this.featureVector)
        };
    }
}
