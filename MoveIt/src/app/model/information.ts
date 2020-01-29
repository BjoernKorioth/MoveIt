interface FireBaseObject {
    id: string;
    content: string;
    createdAt: string;
    imagePath: string;
    source: string;
    title: string;
    link: string;
    picture: string;
}

export class Information {
    id: string;
    content: string;
    createdAt: Date;
    imagePath: string;
    source: string;
    title: string;
    link:string;
    picture: string;

    /**
     * Constructor to create Information
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, content?: string, createdAt?: Date, imagePath?: string, source?: string, title?: string, link?: string, picture?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.content = content || 'Lorem ipsum';
        this.createdAt = createdAt || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        this.imagePath = imagePath || '';
        this.source = source || 'Lorem ipsum';
        this.title = title || 'Lorem ipsum';
        this.link = link || 'No Link';
        this.picture = picture || '';
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
            firebaseObject.content || '',
            new Date(firebaseObject.createdAt) || new Date(),
            firebaseObject.imagePath || '',
            firebaseObject.source || '',
            firebaseObject.title || '',
            firebaseObject.link || '',
            firebaseObject.picture || ''
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
            createdAt: this.createdAt.toDateString(),
            imagePath: this.imagePath,
            source: this.source,
            title: this.title,
            link: this.link,
            picture: this.picture
        };
    }
}
