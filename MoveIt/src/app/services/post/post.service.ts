import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import * as firebase from 'firebase/app';
import {User} from '../../model/user';
import {first, map, switchMap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {ReplaySubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private user: ReplaySubject<User>;

    constructor(private fireDatabase: AngularFireDatabase, private userService: UserService) {
        // TODO get user
        this.user = new ReplaySubject(1);
        userService.getUser().subscribe(this.user);
        userService.getUser().subscribe(user => console.log(user));
    }

    /**
     * Creates a new post in firebase from an post objects
     *
     * @param post an existing post object
     */
    createPost(post: Post) {
        return new Promise<any>((resolve, reject) => {
            this.user.pipe(first()).subscribe(user => {
                const id = firebase.database().ref('/posts/' + user.group).push().key;
                post.id = id;
                post.group = user.group;
                post.user = user.id;
                console.log(post);

                this.fireDatabase.database.ref('/posts/' + user.group).child(id)
                    .set(post.toFirebaseObject()).then(
                    // Returns the post with the new id
                    () => resolve(post),
                    err => reject(err)
                );
            });
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
            this.user.pipe(first()).subscribe(user => {

                post.id = postId;
                post.group = user.group;

                this.fireDatabase.database.ref('/posts/' + user.group).child(postId)
                    .set(post.toFirebaseObject()).then(
                    res => resolve(res),
                    err => reject(err)
                );
            });
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
                    this.user.pipe(first()).subscribe(user => {
                        if (post.like(user.id)) {
                            this.editPost(post.id, post).then(
                                () => resolve('Successfully liked the post'),
                                err => reject(err)
                            );

                        } else {
                            this.unlikePost(postId);
                        }
                    });
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
                    this.user.pipe(first()).subscribe(user => {
                        if (post.unlike(user.id)) {
                            this.editPost(post.id, post).then(
                                () => resolve('Successfully unliked the post'),
                                err => reject(err)
                            );
                        } else {
                            this.likePost(postId);
                        }
                    });
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
            this.user.pipe(first()).subscribe(user => {
                firebase.database().ref('/posts/' + user.group).child(postId).once('value').then(
                    snapshot => {
                        const data = snapshot.val();
                        // Convert the data to an post object and return it
                        resolve(Post.fromFirebaseObject(user.group, postId, data));
                    },
                    err => reject(err)
                );
            });
        });
    }

    /**
     * Retrieve all activities of the group
     */
    getAllPosts() {
        return this.user.pipe(switchMap(user => {
            const ref = this.fireDatabase.list<Post>('/posts/' + user.group, query => query.orderByChild('createdAt'));
            return ref.snapshotChanges().pipe(map(posts => posts.map(
                postSnapshot => Post.fromFirebaseObject(user.group, postSnapshot.key, postSnapshot.payload.val())).reverse()));
        }));

    }

    /**
     * Creates a new comment in firebase from an comment objects
     *
     * @param postId id of the post to be commented on
     * @param userComment an existing comment object
     */
    createComment(postId: string, userComment: string) {
        const comment = new Comment();
        return new Promise<any>((resolve, reject) => {
            this.user.pipe(first()).subscribe(user => {
                const id = firebase.database().ref('/posts/' + user.group).child(postId).child('comments').push().key;
                comment.id = id;
                comment.post = postId;
                comment.text = userComment;
                comment.user = user.name;

                this.fireDatabase.database.ref('/posts/' + user.group).child(comment.post).child('comments').child(id)
                    .set(comment.toFirebaseObject()).then(
                    // Returns the post with the new id
                    () => resolve(comment),
                    err => reject(err)
                );
            });
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

            this.user.pipe(first()).subscribe(user => {
                this.fireDatabase.database.ref('/posts/' + user.group).child(postId).child('comments').child(commentId)
                    .set(comment.toFirebaseObject()).then(
                    res => resolve(res),
                    err => reject(err)
                );
            });
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
            this.user.pipe(first()).subscribe(user => {
                firebase.database().ref('/posts/' + user.group).child(postId).child('comments').child(commentId).once('value').then(
                    snapshot => {
                        const data = snapshot.val();
                        // Convert the data to an post object and return it
                        resolve(Comment.fromFirebaseObject(postId, commentId, data));
                    },
                    err => reject(err)
                );
            });
        });
    }

    /**
     * Retrieve all comments of a post
     *
     * @param postId id of the post
     */
    getAllComments(postId: string) {
        return this.user.pipe(switchMap(user => {
            return this.fireDatabase.list<Comment>('/posts/' + user.group + '/' + postId).valueChanges();
        }));
    }

}
