import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activity} from '../../model/activity';
import {first, map} from 'rxjs/operators';
import {PostService} from '../post/post.service';
import {Post} from '../../model/post';
import {GoalService} from '../goal/goal.service';
import {RewardsService} from '../rewards/rewards.service';
import {Health} from '@ionic-native/health/ngx';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    activityLocation = '/activities/';

    constructor(private fireDatabase: AngularFireDatabase, private postService: PostService, private goalService: GoalService,
                private rewardsService: RewardsService, private health: Health,) {
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
                    this.runUpdates(activity).then(
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
                () => {
                    this.runUpdates(activity).then(
                        () => resolve(activity),
                        err => reject(err)
                    );
                },
                err => reject(err)
            );
        });
    }

    runUpdates(activity: Activity) {
        return new Promise<any>((resolve, reject) => {
            this.getAllUserActivities().pipe(first()).subscribe(activities => {
                this.goalService.getGoals().pipe(first()).subscribe(goals => {
                    console.log(activities);
                    this.goalService.updateGoals(goals, activities).then(
                        () => {
                            this.rewardsService.updateTrophies(activities, goals).then(
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
                        },
                        err => reject(err)
                    );
                });
            });
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
        const ref = this.fireDatabase
            .list<Activity>(this.activityLocation + firebase.auth().currentUser.uid, query => query.orderByChild('endTime'));
        return ref.snapshotChanges().pipe(map(activities => activities.map(
            activitySnapshot => Activity.fromFirebaseObject(activitySnapshot.key, activitySnapshot.payload.val())).reverse()));
    }

    readFitnessApi(startDate: Date, endDate: Date) {
        this.health.requestAuthorization([
            /* 'distance', 'nutrition', //read and write permissions
            {
                read: ['steps'], //read only permission
                write: ['height', 'weight'] //write only permission
            } */
            'activity', 'distance' // we only need read and write permission
        ])
        .then(
            res => console.log(res))
        .catch(e => console.log(e));
        this.health.query({
            startDate: startDate,
            endDate: endDate,
            dataType: 'activity',
        }).then((value: []) => {
            console.log('Value of Health Data loaded: ', value);
            return Activity.fromFitApi(value);
        }).catch((e: any) => {
            console.error('HealthData ERROR:---' + e);
        });
    }
}
