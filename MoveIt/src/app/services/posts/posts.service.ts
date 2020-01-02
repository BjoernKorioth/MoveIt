import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    /**
     * Creates a new post in firebase from an post objects
     *
     * @param post an existing post object
     */
    createPost(post: Post) {
        return new Promise<any>((resolve, reject) => {
            const id = firebase.database().ref().child('posts').child(firebase.auth().currentUser.uid).push().key;
            post.id = id;

            this.fireDatabase.database.ref('/posts/' + firebase.auth().currentUser.uid).child(id)
                .set(post.toFirebaseObject()).then(
                // Returns the post with the new id
                () => resolve(post),
                err => reject(err)
            );
        });
    }

    /**
     * Updates an post in firebase
     *
     * @param postId the id of the post to be edited
     * @param post the updated/new post
     */
    editPost(postId, post: Post) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/posts/' + firebase.auth().currentUser.uid).child(postId)
                .set(post.toFirebaseObject()).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Retrieves an post from firebase
     *
     * @param postId id of the post
     */
    getPost(postId) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/posts/' + firebase.auth().currentUser.uid).child(postId).once('value').then(
                snapshot => {
                    const data = snapshot.val();
                    // Convert the data to an post object and return it
                    resolve(Post.fromFirebaseObject(postId, data));
                },
                err => reject(err)
            );
        });
    }

    /**
     * Retrieve all activities of the current user
     */
    getAllUserPosts() {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/comments/' + firebase.auth().currentUser.uid).once('value').then(
                snapshot => {
                    // The data is an object which contains each post as a key
                    const data = snapshot.val();

                    // Iterate over the object keys (= the post ids) and reconstruct an post object for each
                    const array = Object.keys(data).map(key => Post.fromFirebaseObject(key, data[key]));
                    resolve(array);
                },
                err => reject(err)
            );
        });
    }

    /**
     * Creates a new comment in firebase from an comment objects
     *
     * @param comment an existing comment object
     */
    createComment(comment: Comment) {
        return new Promise<any>((resolve, reject) => {
            const id = firebase.database().ref().child('comments').child(firebase.auth().currentUser.uid).push().key;
            comment.id = id;

            this.fireDatabase.database.ref('/posts/' + firebase.auth().currentUser.uid).child(id)
                .set(comment.toFirebaseObject()).then(
                // Returns the post with the new id
                () => resolve(comment),
                err => reject(err)
            );
        });
    }

    /**
     * Updates a comment in firebase
     *
     * @param commentId the id of the comment to be edited
     * @param comment the updated/new comment
     */
    editComment(commentId, comment: Comment) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/posts/' + firebase.auth().currentUser.uid).child(postId)
                .set(comment.toFirebaseObject()).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Retrieves a comment from firebase
     *
     * @param commentId id of the comment
     */
    getComment(commentId) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/comment/' + firebase.auth().currentUser.uid).child(commentId).once('value').then(
                snapshot => {
                    const data = snapshot.val();
                    // Convert the data to an post object and return it
                    resolve(Post.fromFirebaseObject(commentId, data));
                },
                err => reject(err)
            );
        });
    }
}
