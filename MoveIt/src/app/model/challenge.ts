interface FireBaseObject {
    id: string;
    description: string;
    endTime: string;
    price: string;
    startTime: string;
    title: string;
    participants: any;
    registered: number;
}

export class Challenge {
    /**
     * Constructor to create Challenge
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, description?: string, endTime?: Date, price?: string, startTime?: Date, title?: string, registered?: number) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || 'runMarathon';
        this.description = description || 'You must walk 10km a day for 1 week';
        this.endTime = endTime || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        this.price = price || '10$ amazon gift card';
        this.startTime = startTime || new Date(2019, 0O5, 0O5, 17, 55, 42, 0);
        this.title = title || 'running';
        this.registered = registered || 0;
    }

    static types = ['running', 'swimming', 'workout'];
    static intensities = ['moderate', 'vigorous', 'weight training'];
    id: string;
    description: string;
    endTime: Date;
    price: string;
    startTime: Date;
    title: string;
    registered: number;

    /**
     * Creates an Challenge object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the challenge
     * @param firebaseObject result of the query
     */
    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        return new Challenge(
            id || '',
            firebaseObject.description || '',
            new Date(firebaseObject.endTime) || new Date(),
            firebaseObject.price || '',
            new Date(firebaseObject.startTime) || new Date(),
            firebaseObject.title || '',
            firebaseObject.participants.length || 0
        );
    }

    /**
     * Converts the challenge to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            description: this.description,
            endTime: this.endTime.toDateString(),
            price: this.price,
            startTime: this.startTime.toDateString(),
            title: this.title
        };
    }
}
