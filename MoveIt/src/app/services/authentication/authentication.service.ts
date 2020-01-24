import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../../model/user';


@Injectable()
export class AuthenticateService {
    private user: User;

    constructor(private db: AngularFireDatabase) {
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
                        // A user credential is returned, from which we can extract the user
                        const user = userCredential.user;
                        // Now, we can create a new user object with the provided information
                        //this.user = new User(user.uid, value.firstname + ' ' + value.surname);
                        this.user = new User(user.uid, value.username, [], [], -1 , [] ,"user", value.birthdate, value.gender);

                        console.log(this.user);
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
        return this.db.object<User>('/users/' + this.user.id).set(this.user);
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

    getUsername() {
        return this.db.object<string>('/users/' + firebase.auth().currentUser.uid + '/name').valueChanges();
    }

    // BK: returns the group the user is assigened to. Will be used in menu.page.ts
    getUsergroup() {
        return this.db.object<string>('/users/' + firebase.auth().currentUser.uid + '/group').valueChanges();
    }

    getSpecificUsername(uid) {
           return this.db.database.ref('/users/' + uid + '/name').once('value');
    }

    async setUser(){
        return await this.db.object<User>('/users/' + firebase.auth().currentUser.uid).valueChanges().subscribe(result => (this.user = result));
    }

    getFullUser(){
        return this.user;
    }
}

