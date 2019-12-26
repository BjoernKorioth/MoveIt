import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private user: AngularFireList<any[]>;

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    createActivity(value) {
        const record = {
                distance: "{ unit: \"km\", value: 12 }",
                endTime: JSON.stringify(new Date(2019, 0O5, 0O5, 17, 23, 42, 0)),
                intensity: "moderate",
                startTime: JSON.stringify(new Date(2019, 0O5, 0O5, 17, 55, 42, 0)),
                type: "running"
            };

        const newPostKey = firebase.database().ref().child('activities').child(firebase.auth().currentUser.uid).push().key;

        this.fireDatabase.database.ref().child('activities').child(firebase.auth().currentUser.uid).child(newPostKey).set(record);
    }

    editActivity(value) {
        const record = {
            distance: "{ unit: \"km\", value: 12 }",
            endTime: JSON.stringify(new Date(2019, 0O5, 0O5, 17, 23, 42, 0)),
            intensity: "moderate",
            startTime: JSON.stringify(new Date(2019, 0O5, 0O5, 17, 55, 42, 0)),
            type: "running"
        };

        this.fireDatabase.database.ref().child('activities').child(firebase.auth().currentUser.uid).set(record);
    }

    getActivity(value) {
        return firebase.database().ref('/activities/' + firebase.auth().currentUser.uid).child(value).once('value');
    }

    getAllUserActivities(value) {
        return firebase.database().ref('/activities/' + firebase.auth().currentUser.uid).once('value');
    }

}
