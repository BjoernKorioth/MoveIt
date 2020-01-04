import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Observable, Subject} from "rxjs";
import {User} from '../../model/user';


@Injectable()
export class AuthenticateService {

    private requestUser: AngularFireObject<User>;
    private user:User;

    constructor(private fireDatabase: AngularFireDatabase) {
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
                    res => resolve(res),
                    err => reject(err));
        });
    }

    logoutUser() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut()
                    .then(() => {
                        this.user = null;
                        console.log('LOG Out');
                        resolve();
                    }).catch((error) => {
                    reject(error);
                });
            }
        });
    }

    userDetails() {
        return firebase.auth().currentUser;
    }

    /*loggedUserDetails() {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(
                snapshot => {
                    const data = snapshot.val();
                    // Convert the data to an activity object and return it
                    resolve(User.fromFirebaseObject(firebase.auth().currentUser.uid, data));
                },
                err => reject(err)
            );
        });
    }*/

    loggedUserDetails():AngularFireObject<User> {
        this.requestUser = this.fireDatabase.object('/users/' + firebase.auth().currentUser.uid);
        
        return this.requestUser;
    }

    logUser(){
        if(this.user == null){
            this.loggedUserDetails().snapshotChanges().subscribe(snapshot => {
                this.user = snapshot.payload.val();
                console.log("TEST");
                console.log(this.user);
            })
        }
        
    }

    getUser(){
        console.log(this.user);
        return this.user;
    }
}

