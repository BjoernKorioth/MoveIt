import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import {ViewLog} from '../../model/viewLog';
import {ActionLog} from '../../model/actionLog';
import {Reaction} from '../../model/reaction';

@Injectable({
    providedIn: 'root'
})
export class TrackingService {

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    startRecordingViewTime(view: string) {
        const viewLog = new ViewLog();
        viewLog.view = view;
        console.log(viewLog);
        return viewLog;
    }

    stopRecordingViewTime(viewLog: ViewLog) {
        viewLog.endTime = new Date();
        this.logViewTime(viewLog);
        console.log(viewLog);
    }

    logViewTime(viewLog: ViewLog) {
        if (firebase.auth().currentUser) {
            this.fireDatabase.database.ref('/tracking/' + firebase.auth().currentUser.uid + '/viewLogs').push(viewLog.toFirebaseObject());
        } else {
            console.log('no log created for ' + viewLog.view + ', because user is not logged in');
        }
    }

    logAction(actionLog: ActionLog) {
        return this.fireDatabase.database.ref('/tracking/' + firebase.auth().currentUser.uid + '/actionLogs').push(actionLog.toFirebaseObject());
    }

    logReaction(notification: string, response: string) {
        const reaction = new Reaction(notification, response);
        this.fireDatabase.database.ref('/tracking/' + firebase.auth().currentUser.uid + '/reactions').push(reaction.toFirebaseObject());
    }

    setReaction(id: string, type: string, response: string) {
        const reaction = new Reaction(type, response);
        return this.fireDatabase.database.ref('/tracking/' + firebase.auth().currentUser.uid + '/reactions/' + id)
            .set(reaction.toFirebaseObject());
    }
}
