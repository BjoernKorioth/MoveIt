import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {User} from '../../model/user';


@Injectable()
export class AuthenticateService {

    private user: User;

    private list: AngularFireList<any>;

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    registerUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    (userCredential) => {
                        const user = userCredential.user;
                        this.user = new User(user.uid, value.firstname + ' ' + value.surname);
                        this.registerOnDatabase().then(
                            res => resolve(res),
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

    loggedUserDetails() {
        return this.user;
    }
}

