import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import * as firebase from 'firebase/app';
import {AuthenticateService} from '../authentication/authentication.service';
import {User} from '../../model/user';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private user: User;

    constructor(private fireDatabase: AngularFireDatabase, private authenticateService: AuthenticateService) {
        this.user = authenticateService.loggedUserDetails();
    }

    /**
     * Creates a new post in firebase from an post objects
     *
     * @param post an existing post object
     */
    createPost(post: Post) {
        return new Promise<any>((resolve, reject) => {
            const id = firebase.database().ref('/posts/' + this.user.group).push().key;
            post.id = id;
            post.group = this.user.group;
            post.user = this.user.id;

            this.fireDatabase.database.ref('/posts/' + this.user.group).child(id)
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
    editPost(postId: string, post: Post) {
        return new Promise<any>((resolve, reject) => {
            post.id = postId;
            post.group = this.user.group;

            this.fireDatabase.database.ref('/posts/' + this.user.group).child(postId)
                .set(post.toFirebaseObject()).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Like a post
     *
     * The post is downloaded and the current user (who likes the post) is added to the likes
     *
     * @param postId id of the post to be liked
     */
    likePost(postId: string) {
        return new Promise<any>((resolve, reject) => {
            this.getPost(postId).then(
                post => {
                    if (post.like(this.user.id)) {
                        this.editPost(post.id, post).then(
                            () => resolve('Successfully liked the post'),
                            err => reject(err)
                        );
                    } else {
                        reject('This post is already liked by you');
                    }
                },
                err => reject(err)
            );
        });
    }

    /**
     * Unlike a post
     *
     * The post is downloaded and the current user (who likes the post) is added to the likes
     *
     * @param postId id of the post to be liked
     */
    unlikePost(postId: string) {
        return new Promise<any>((resolve, reject) => {
            this.getPost(postId).then(
                post => {
                    if (post.unlike(this.user.id)) {
                        this.editPost(post.id, post).then(
                            () => resolve('Successfully unliked the post'),
                            err => reject(err)
                        );
                    } else {
                        reject('This post is not liked by you');
                    }
                },
                err => reject(err)
            );
        });
    }

    /**
     * Retrieves an post from firebase
     *
     * @param postId id of the post
     */
    getPost(postId: string) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/posts/' + this.user.group).child(postId).once('value').then(
                snapshot => {
                    const data = snapshot.val();
                    // Convert the data to an post object and return it
                    resolve(Post.fromFirebaseObject(this.user.group, postId, data));
                },
                err => reject(err)
            );
        });
    }

    /**
     * Retrieve all activities of the group
     */
    getAllPosts() {
        return this.fireDatabase.list<Post>('/posts/' + this.user.group).valueChanges();
        // .pipe(map(array => array.map(post => Post.fromFirebaseObject(this.user.group, post.id, post))));
    }

    /**
     * Creates a new comment in firebase from an comment objects
     *
     * @param postId id of the post to be commented on
     * @param comment an existing comment object
     */
    createComment(postId: string, comment: Comment) {
        return new Promise<any>((resolve, reject) => {
            const id = firebase.database().ref('/posts/' + this.user.group).child(postId).child('comments').push().key;
            comment.id = id;
            comment.post = postId;

            this.fireDatabase.database.ref('/posts/' + this.user.group).child(comment.post).child('comments').child(id)
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
     * @param postId id of the post the comment belongs to
     * @param commentId id of the comment to be edited
     * @param comment the updated/new comment
     */
    editComment(postId: string, commentId: string, comment: Comment) {
        return new Promise<any>((resolve, reject) => {
            comment.post = postId;
            comment.id = commentId;

            this.fireDatabase.database.ref('/posts/' + this.user.group).child(postId).child('comments').child(commentId)
                .set(comment.toFirebaseObject()).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Retrieves a comment from firebase
     *
     * @param postId id of the post
     * @param commentId id of the comment
     */
    getComment(postId, commentId) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/posts/' + this.user.group).child(postId).child('comments').child(commentId).once('value').then(
                snapshot => {
                    const data = snapshot.val();
                    // Convert the data to an post object and return it
                    resolve(Comment.fromFirebaseObject(postId, commentId, data));
                },
                err => reject(err)
            );
        });
    }

    /**
     * Retrieve all comments of a post
     *
     * @param postId id of the post
     */
    getAllComments(postId: string) {
        return this.fireDatabase.list<Comment>('/posts/' + this.user.group + '/' + postId).valueChanges();
    }
}
