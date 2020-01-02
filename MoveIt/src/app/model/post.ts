import {Comment} from './comment';

interface FireBaseObject {
    group: number;
    id: string;
    activity: string;
    comments: Array<Comment>;
    content: string;
    createdAt: string;
    likes: Array<string>;
    user: string;
}

export class Post {
    group: number;
    id: string;
    activity: string;
    comments: Array<Comment>;
    content: string;
    createdAt: Date;
    likes: Array<string>;
    user: string;

    /**
     * Constructor to create Post
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(group?: number, id?: string, activity?: string, comments?: Array<Comment>, content?: string,
                createdAt?: Date, likes?: Array<string>, user?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.group = group || 0;
        this.id = id || '';
        this.activity = activity || '';
        this.comments = comments || [];
        this.content = content || 'Lorem ipsum';
        this.createdAt = createdAt || new Date();
        this.likes = likes || [];
        this.user = user || '';
    }

    /**
     * Creates a Post object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the post
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(id: string, firebaseObject: FireBaseObject) {
        // @ts-ignore TS2339
        return new Post(
            firebaseObject.group || 0,
            id || '',
            firebaseObject.activity || '',
            firebaseObject.comments || [],
            firebaseObject.content || '',
            new Date(firebaseObject.createdAt) || new Date(),
            firebaseObject.likes || [],
            firebaseObject.user || ''
        );
    }

    /**
     * Converts the post to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            activity: this.activity,
            comments: this.comments,
            content: this.content,
            createdAt: this.createdAt.toDateString(),
            likes: this.likes,
            user: this.user
        };
    }
}
