import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import {ViewLog} from '../../model/viewLog';
import {ActionLog} from '../../model/actionLog';

@Injectable({
    providedIn: 'root'
})
export class TrackingService {

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    logViewTime(viewLog: ViewLog) {
        this.fireDatabase.database.ref('/tracking/' + firebase.auth().currentUser.uid + '/viewLogs').push(viewLog.toFirebaseObject());
    }

    logAction(actionLog: ActionLog) {
        this.fireDatabase.database.ref('/tracking/' + firebase.auth().currentUser.uid + '/actionLogs').push(actionLog.toFirebaseObject());
    }
}
