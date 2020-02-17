import {Challenge} from './challenge';

interface FireBaseObject {
    id: string;
    name: string;
    challengesActive: Array<Challenge>;
    group: string;
    type: string;
    birthday: string;
    gender: string;
    profilePictureUrl: string;
    token: string;
}

export class User {

    /**
     * Constructor to create User object
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, name?: string, challengesActive?: Array<any>, group?: string, type?: string,
                birthday?: Date, gender?: string, profilePictureUrl?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '-1';
        this.name = name || 'No username';
        this.challengesActive = challengesActive || [];
        this.group = group || '-1';
        this.type = type || 'user';
        this.birthday = birthday || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        this.gender = gender;
        this.profilePictureUrl = profilePictureUrl || '';
    }
    id: string;
    name: string;
    challengesActive: Array<any>;
    group: string;
    type: string;
    birthday: Date;
    gender: string;
    profilePictureUrl: string;
    token: string;

    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        return new User(
            id || '',
            firebaseObject.name || 'Test Account',
            firebaseObject.challengesActive || [],
            firebaseObject.group || '-1',
            firebaseObject.type || '',
            new Date(firebaseObject.birthday) || new Date(),
            firebaseObject.gender || '',
            firebaseObject.profilePictureUrl || ''
        );
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
            group: this.group,
            type: this.type,
            birthday: this.birthday.toDateString(),
            gender: this.gender,
            profilePictureUrl: this.profilePictureUrl,
        };
    }
}
