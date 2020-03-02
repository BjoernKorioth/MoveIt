import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../../model/user';
import {Group} from '../../model/group';
import {flatMap, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private db: AngularFireDatabase) {
    }

    // BK: returns the group the user is assigened to. Will be used in menu.page.ts
    getUsergroup() {
        return this.db.object<string>('/users/' + firebase.auth().currentUser.uid + '/group').valueChanges();
    }

    getGroupconfig(groupId) {
        return this.db.object<string>('/groups/' + groupId + '/featureVector').valueChanges();
    }

    getUsername() {
        return this.db.object<string>('/users/' + firebase.auth().currentUser.uid + '/name').valueChanges();
    }

    getUsernameById(uid: string) {
        return this.db.object<string>('/users/' + uid + '/name').valueChanges();
    }

    getSpecificUsername(uid) {
        return this.db.database.ref('/users/' + uid + '/name').once('value');
    }

    getSpecificUserBirthday(uid) {
        return this.db.database.ref('/users/' + uid + '/birthday').once('value');
    }

    getUser() {
        return Observable.create(observer => {
            firebase.auth().onAuthStateChanged(user => observer.next(user.uid));
        }).pipe(flatMap((userId: string) => {
            return this.db.object<any>('/users/' + userId).snapshotChanges()
                .pipe(map(userSnapshot => User.fromFirebaseObject(userId, userSnapshot.payload.val())));
        }));
    }

    getUserById(userId: string) {
        if (firebase.auth().currentUser) {
            return this.db.object<any>('/users/' + userId).snapshotChanges()
                .pipe(map(userSnapshot => User.fromFirebaseObject(userId, userSnapshot.payload.val())));
        } else {
            return of(new User());
        }
    }

    getProfilePictureUrl() {
        return this.db.database.ref('/users/' + firebase.auth().currentUser.uid + '/profilePictureUrl').once('value');
    }

    getSpecificProfilePictureUrl(uid: any) {
        return this.db.object<string>('/users/' + uid + '/profilePictureUrl').valueChanges();

    }

    /**
     * Creates a group
     *
     * @param group Group object
     */
    createGroup(group: Group) {
        return new Promise((resolve, reject) => {
            this.db.database.ref('/groups/' + name).push(group.toFirebaseObject()).then(
                newReference => {
                    group.id = newReference.key;
                    resolve(group);
                },
                err => reject(err)
            );
        });
    }

    /**
     * Update a group
     *
     * @param group new Group object
     */
    editGroup(group: Group) {
        return this.db.database.ref('/groups/' + group.id).set(group.toFirebaseObject());
    }

    getGroups() {
        const ref = this.db.list<any>('/groups/');
        // Retrieve an array, but with its metadata. This is necessary to have the key available
        return ref.snapshotChanges().pipe(
            map(groups => groups.map(groupPayload => Group.fromFirebaseObject(groupPayload.key, groupPayload.payload.val()))));
    }

    getUsers() {
        const ref = this.db.list<any>('/users/');
        // Retrieve an array, but with its metadata. This is necessary to have the key available
        return ref.snapshotChanges().pipe(
            map(users => users.map(userPayload => (User.fromFirebaseObject(userPayload.key, userPayload.payload.val())))));
    }

    getOTPs() {
        const ref = this.db.list<any>('/otps/');
        // Retrieve an array, but with its metadata. This is necessary to have the key available
        return ref.snapshotChanges().pipe(
            map(otp => otp.map(otpPayload => ({otp: otpPayload.key, group: otpPayload.payload.val()}))));
    }

    /**
     * Creates a new user
     *
     * This doesn't fully create a user, but just creates a one-time-password in the DB, which can be used to register a new account
     * @param groupID of the user who will use the one-time-password
     */
    createUser(groupID: string) {
        return this.db.database.ref('/otps/' + this.generateUID()).set(groupID);
    }

    /**
     * Change the group a user belongs to
     *
     * @param userID id of the user
     * @param groupID id of the new group the user should belong to
     */
    changeUserGroup(userID: string, groupID: string) {
        return this.db.database.ref('/users/' + userID + '/group').set(groupID);
    }

    /**
     * Change the token of the user for FCM
     *
     * @param token the token
     */
    changeUserToken(token: string) {
        return this.db.database.ref('/users/' + firebase.auth().currentUser.uid + '/token').set(token);
    }

    /**
     * Change the profile picture of a user
     *
     * @param userID id of the user
     * @param profilePictureUrl url of pointing to the new profile picture
     */
    changeProfilePicture(userID: string, profilePictureUrl: string) {
        return this.db.database.ref('/users/' + userID + '/profilePictureUrl').set(profilePictureUrl);
    }

    /**
     * Generate a 6-character random string, which serves as a UID
     */
    generateUID() {
        // I generate the UID from two parts here
        // to ensure the random number provide enough bits.
        // tslint:disable-next-line:no-bitwise
        const firstPart = (Math.random() * 46656) | 0;
        // tslint:disable-next-line:no-bitwise
        const secondPart = (Math.random() * 46656) | 0;
        const firstPartString = ('000' + firstPart.toString(36)).slice(-3);
        const secondPartString = ('000' + secondPart.toString(36)).slice(-3);
        return firstPartString + secondPartString;
    }
}
