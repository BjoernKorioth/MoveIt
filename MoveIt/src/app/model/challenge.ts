interface FireBaseObject {
    id: string;
    description: string;
    endTime: string;
    price: string;
    startTime: string;
    finished: boolean;
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
    constructor(id?: string, description?: string, endTime?: Date, price?: string, startTime?: Date, title?: string,
                participantObject?: any, finished?: boolean) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.description = description || '';
        this.endTime = endTime;
        this.price = price || '';
        this.startTime = startTime;
        this.title = title || '';
        this.participants = [];
        //to get the number iterates through the object of participants 
        if(participantObject !== undefined){
            for (var user of Object.keys(participantObject)) {
                this.participants.push(participantObject[user]);
            }
        }
        this.finished = finished || false;
    }

    static types = ['running', 'swimming', 'workout'];
    static intensities = ['moderate', 'vigorous', 'weight training'];
    id: string;
    description: string;
    endTime: Date;
    price: string;
    startTime: Date;
    title: string;
    finished: boolean;
    participants: Array<any>;
    startTimeIso: string;
    endTimeIso: string;

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
            firebaseObject.participants || 0,
            firebaseObject.finished
        );
    }

    /**
     * Converts the challenge to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        console.log(this.endTime);
        console.log(this.startTime);

        return {
            description: this.description,
            endTime: this.endTime.toString(),
            price: this.price,
            startTime: this.startTime.toString(),
            title: this.title,
            finished: this.finished,
            participants: this.participants
        };
        
    }
}
