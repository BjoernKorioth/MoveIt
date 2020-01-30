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
    constructor(id?: string, content?: string, createdAt?: Date, picture?: string, link?: string, title?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.content = content || '';
        this.createdAt = createdAt || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
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

    static fromFirebaseObject(id: string, information: Information) {
        // @ts-ignore TS2339
        return new Information(
            id || '',
            information.content || '',
            new Date(information.createdAt) || new Date(),
            information.picture || '',
            information.link || '',
            information.title || ''
        );
    }

    /**
     * Converts the information to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject(){
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
