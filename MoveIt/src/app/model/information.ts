interface FireBaseObject {
    id: string;
    content: string;
    createdAt: string;
    picture: string;
    link: string;
    title: string;
}

export class Information {
    id: string;
    content: string;
    createdAt: Date;
    picture: string;
    link: string;
    title: string;

    /**
     * Constructor to create Information
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, title?: string, content?: string, link?: string, picture?: string, createdAt?: Date) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.content = content || '';
        this.createdAt = createdAt || new Date();
        this.picture = picture || '';
        this.link = link || '';
        this.title = title || '';
    }

    /**
     * Creates an Information object from a firebase query
     *
     * This basically reconstructs the date from the date string
     *
     * @param id id of the activity
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        // @ts-ignore TS2339
        return new Information(
            id || '',
            firebaseObject.title || '',
            firebaseObject.content || '',
            firebaseObject.link || '',
            firebaseObject.picture || '',
            new Date(firebaseObject.createdAt) || new Date()
        );
    }

    /**
     * Converts the information to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            id: this.id,
            content: this.content,
            createdAt: this.createdAt.getTime(),
            picture: this.picture,
            link: this.link,
            title: this.title
        };

    }
}
