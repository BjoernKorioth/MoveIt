interface FireBaseObject {
    group: number;
    post: string;
    id: string;
    createdAt: string;
    text: string;
    user: string;
}

export class Comment {
    group: number;
    post: string;
    id: string;
    createdAt: Date;
    text: string;
    user: string;

    /**
     * Constructor to create Comment
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(group?: number, post?: string, id?: string, createdAt?: Date, text?: string, user?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.group = group || 0;
        this.post = post || '';
        this.id = id || '';
        this.createdAt = createdAt || new Date();
        this.text = text || 'Lorem ipsum';
        this.user = user || '';
    }

    /**
     * Creates a Comment object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param postId id of the post
     * @param commentId id of the comment
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(postId: string, commentId: string, firebaseObject: FireBaseObject) {
        return new Comment(
            firebaseObject.group || -1,
            postId || '',
            commentId || '',
            new Date(firebaseObject.createdAt) || new Date(),
            firebaseObject.text || '',
            firebaseObject.user || ''
        );
    }

    /**
     * Converts the comment to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            createdAt: this.createdAt.getTime(),
            text: this.text,
            user: this.user
        };
    }
}
