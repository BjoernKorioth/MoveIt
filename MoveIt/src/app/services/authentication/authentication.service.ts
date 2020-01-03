import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {User} from '../../model/user';


@Injectable()
export class AuthenticateService {

    private user: User;

    private list: AngularFireList<any>;

    constructor(private fireDatabase: AngularFireDatabase) {
        this.user = new User();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('Some user is signed in');
                this.getUser();
            } else {
                console.log('No user is signed in');
                // No user is signed in.
            }
        });
    }

    /**
     * registerUser
     *
     * creates a new user in the firebase authentication service and the database
     *
     * @param value contains the contents of the registration form
     */
    registerUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    // If the auth service could create the new user, we'll enter this function
                    (userCredential) => {
                        // We get a user credential returned, from which we extract the user
                        const user = userCredential.user;
                        // Now, we can create a new user object with the provided information
                        this.user = new User(user.uid, value.firstname + ' ' + value.surname);
                        // Try to create the user on the database
                        this.registerOnDatabase().then(
                            // If this is successful, resolve the promise
                            res => resolve(res),
                            // If it's not successful, the user was created with the auth service but not in the database
                            err => reject(err)
                        );
                    },
                    err => reject(err));
        });
    }

    registerOnDatabase() {
        return this.fireDatabase.database.ref().child('users').child(this.user.id).set(this.user.toFirebaseObject());
    }

    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => {
                        this.getUser().then(
                            res2 => resolve(res2),
                            err => reject(err)
                        );
                    },
                    err => reject(err));
        });
    }

    logoutUser() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser !== null) {
                firebase.auth().signOut().then(() => {
                    this.user = new User();
                    console.log('LOG Out');
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            }
        });
    }

    /**
     * Get the user data
     *
     * Check if the user is logged in, and if so fetch the user data and populate the user variable
     */
    getUser() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser !== null) {
                this.fireDatabase.database.ref('/users/' + firebase.auth().currentUser.uid).once('value').then(
                    res => {
                        const user = res.val();
                        console.log(user);
                        this.user = user;
                    },
                    err => console.log(err)
                );
            } else {
                reject('User is not logged in');
            }
        });
    }

    userDetails() {
        return firebase.auth().currentUser;
    }

    loggedUserDetails() {
        // TODO this function is called in the menu page, it returns an error.
        // this could be because the function is called before the user variable is set in this controller
        return this.user; // this.user.name || 'not found';
    }
}

