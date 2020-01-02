import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../../model/user';
import {Activity} from '../../model/activity';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    /**
     * Creates a new activity in firebase from an activity objects
     *
     * @param activity an existing activity object
     */
    createActivity(activity: Activity) {
        return new Promise<any>((resolve, reject) => {
            const id = firebase.database().ref().child('activities').child(firebase.auth().currentUser.uid).push().key;
            activity.id = id;

            this.fireDatabase.database.ref('/activities/' + firebase.auth().currentUser.uid).child(id)
                .set(activity.toFirebaseObject()).then(
                // Returns the activity with the new id
                () => resolve(activity),
                err => reject(err)
            );
        });
    }

    /**
     * Updates an activity in firebase
     *
     * @param activityId the id of the activity to be edited
     * @param activity the updated/new activity
     */
    editActivity(activityId, activity: Activity) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/activities/' + firebase.auth().currentUser.uid).child(activityId)
                .set(activity.toFirebaseObject()).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    /**
     * Retrieves an activity from firebase
     *
     * @param activityId id of the activity
     */
    getActivity(activityId) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/activities/' + firebase.auth().currentUser.uid).child(activityId).once('value').then(
                snapshot => {
                    const data = snapshot.val();
                    // Convert the data to an activity object and return it
                    resolve(Activity.fromFireBaseObject(activityId, data));
                },
                err => reject(err)
            );
        });
    }

    /**
     * Retrieve all activities of the current user
     */
    getAllUserActivities() {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/activities/' + firebase.auth().currentUser.uid).once('value').then(
                snapshot => {
                    // The data is an object which contains each activity as a key
                    const data = snapshot.val();

                    // Iterate over the object keys (= the activity ids) and reconstruct an activity object for each
                    const array = Object.keys(data).map(key => Activity.fromFireBaseObject(key, data[key]));
                    resolve(array);
                },
                err => reject(err)
            );
        });
    }
}
