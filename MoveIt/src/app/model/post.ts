import {Comment} from './comment';

interface FireBaseObject {
    group: number;
    id: string;
    activity: string;
    comments: Array<Comment>;
    content: string;
    createdAt: Date;
    likes: Array<string>;
    user: string;
}

export class Post {

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
    group: number;
    id: string;
    activity: string;
    comments: Array<Comment>;
    content: string;
    createdAt: Date;
    likes: Array<string>;
    user: string;

    /**
     * Creates a Post object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param group user group the post belongs to
     * @param id id of the post
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(group: number, id: string, firebaseObject: FireBaseObject) {
        // @ts-ignore TS2339
        let comments = [];
        if (firebaseObject.comments && typeof firebaseObject.comments === 'object') {
            comments = Object.keys(firebaseObject.comments).map(key => Comment.fromFirebaseObject(id, key, firebaseObject.comments[key]));
        }
        return new Post(
            group || 0,
            id || '',
            firebaseObject.activity || '',
            comments || [],
            firebaseObject.content || '',
            new Date(firebaseObject.createdAt) || new Date(),
            firebaseObject.likes || [],
            firebaseObject.user || ''
        );
    }

    /**
     * Like a post
     *
     * the user id will be added to likes
     *
     * @param user id of the user who likes the post
     */
    like(user: string) {
        if (!this.likes.includes(user)) {
            this.likes.push(user);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Unlike a post
     *
     * remove the user id from likes
     *
     * @param user id of the user to be removed from the likes
     */
    unlike(user: string) {
        const position = this.likes.indexOf(user);
        if (position >= 0) {
            this.likes.splice(position, 1);
            return true;
        } else {
            return false;
        }
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
