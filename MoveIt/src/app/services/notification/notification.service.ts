import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private db: AngularFireDatabase) {
    }

    sendUserNotification(uid: string, title: string, body: string, type: string) {
        return new Promise((reject, resolve) => {
            const sendNotification = firebase.functions().httpsCallable('sendNotification');

            return this.db.database.ref('/users/' + uid + '/token').once('value').then(
                tokenSnap => {
                    const token = tokenSnap.val();
                    if (!token) {
                        reject('no token found for user id');
                    }
                    const data = {
                        token,
                        title,
                        body,
                        type,
                        uid,
                        id: (new Date()).getTime().toString()
                    };
                    console.log(data);
                    return sendNotification(data).then(
                        (result) => resolve(result),
                        err => reject(err));
                },
                err => reject(err)
            );
        });
    }

    sendGoalNotification(title, body) {
        function checkIfGoalsMet(wins) {
            let startOfWeek = new Date();
            startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day (= 0:00:00)
            // If it's a weekly goal, set to start of the week (week starts on Sunday)
            const start = startOfWeek.getDate() - startOfWeek.getDay();
            startOfWeek = new Date(startOfWeek.setDate(start));

            if (!('weeklyModerate' in wins) || !('weeklyVigorous' in wins) || !('weeklyWeight' in wins)) {
                return true;
            }

            if (wins.weeklyModerate.slice(-1)[0] < startOfWeek.getTime()
                || (wins.weeklyVigorous.slice(-1)[0] < startOfWeek.getTime())
                || (wins.weeklyWeight.slice(-1)[0] < startOfWeek.getTime())) {
                return true;
            }

            return false;
        }

        return new Promise((reject, resolve) => {
            this.db.database.ref('users').once('value').then(
                usersSnapshot => {
                    const users = usersSnapshot.val();
                    console.log(users);
                    for (const user in users) {
                        if (users.hasOwnProperty(user)) {
                            this.db.database.ref('/wins/' + user).once('value').then(
                                winsSnapshot => {
                                    const wins = winsSnapshot.val();
                                    let sendNotification = true;
                                    if (wins) {
                                        sendNotification = checkIfGoalsMet(wins);
                                    }

                                    if (sendNotification) {
                                        if ('token' in users[user]) {
                                            console.log('sending notification to ' + user);
                                            this.sendUserNotification(user, title, body, 'goalReminder').then(
                                                res => console.log(res),
                                                err => reject(err)
                                            );
                                        } else {
                                            console.log('user has no token ' + user);
                                        }
                                    }
                                },
                                err => reject(err)
                            );
                        }
                    }
                },
                err => reject(err)
            );
        });
    }
}
