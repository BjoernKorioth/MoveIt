import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activity} from '../../model/activity';
import {map} from 'rxjs/operators';
import {PostService} from '../post/post.service';
import {Post} from '../../model/post';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    activityLocation = '/activities/';

    constructor(private fireDatabase: AngularFireDatabase, private postService: PostService) {
    }

    /**
     * Creates a new activity in firebase from an activity objects
     *
     * @param activity an existing activity object
     */
    createActivity(activity: Activity) {
        return new Promise<any>((resolve, reject) => {
            const id = firebase.database().ref(this.activityLocation + firebase.auth().currentUser.uid).push().key;
            activity.id = id;

            this.fireDatabase.database.ref('/activities/' + firebase.auth().currentUser.uid).child(id)
                .set(activity.toFirebaseObject()).then(
                // Returns the activity with the new id
                () => {
                    const post = new Post();
                    post.activity = activity.id;
                    post.content = 'Look, I did ' + activity.getDuration() + ' minutes of ' + activity.type;
                    this.postService.createPost(post).then(
                        () => resolve(activity),
                        err => reject(err)
                    );
                },
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
            this.fireDatabase.database.ref(this.activityLocation + firebase.auth().currentUser.uid).child(activityId)
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
            firebase.database().ref(this.activityLocation + firebase.auth().currentUser.uid).child(activityId).once('value').then(
                snapshot => {
                    const data = snapshot.val();
                    // Convert the data to an activity object and return it
                    resolve(Activity.fromFirebaseObject(activityId, data));
                },
                err => reject(err)
            );
        });
    }

    /**
     * Retrieve all activities of the current user
     */
    getAllUserActivities() {
        const ref = this.fireDatabase.list<Activity>(this.activityLocation + firebase.auth().currentUser.uid);
        return ref.snapshotChanges().pipe(map(activities => activities.map(
            activitySnapshot => Activity.fromFirebaseObject(activitySnapshot.key, activitySnapshot.payload.val()))));
    }

    /**
     * Filter an array of activities based on time and intensity
     *
     * The output is an array of activities, where all items match the given intensity and their endTime lies between
     * the fromDate and the untilDate
     *
     * @param activities array of activities
     * @param intensity intensity to filter for (e.g. 'moderate')
     * @param fromDate earliest endTime of an activity
     * @param untilDate latest endTime of an activity
     */
    filterActivities(activities: Array<Activity>, intensity: string, fromDate: Date = new Date(0), untilDate: Date = new Date()) {
        return activities.filter((activity: Activity) => {
            if (activity.intensity !== intensity) {
                return false;
            }

            if (activity.endTime <= fromDate) {
                return false;
            }

            if (activity.endTime >= untilDate) {
                return false;
            }

            return true;
        });
    }
}
