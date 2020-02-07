import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {parse} from 'json2csv';
import {first, flatMap, map} from 'rxjs/operators';
import {forkJoin, from, Observable} from 'rxjs';
import {Trophy} from '../../model/trophy';
import {Goal} from '../../model/goal';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    constructor(private db: AngularFireDatabase) {
    }

    export(entity: string, scope?: string, id?: string) {
        let fetchData;
        console.log(entity + ' ' + scope);

        switch (entity) {
            case 'defaultGoals': {
                fetchData = this.exportDefaultGoals();
                break;
            }
            case 'trophies': {
                fetchData = this.exportTrophies();
                break;
            }
            case 'challenges': {
                fetchData = this.exportChallenges().toPromise();
                break;
            }
            default: {
                fetchData = this.exportDynamicEntity(entity, scope, id);
            }
        }

        fetchData.then(
            params => {
                // const opts = {fields: params.fields};
                try {
                    // const csv = parse(params.data, opts);
                    console.log(params);
                    const csv = parse(params);
                    console.log(csv);
                } catch (err) {
                    console.error(err);
                }
            },
            err => console.log(err)
        );
    }

    exportDynamicEntity(entity: string, scope: string, id: string) {
        let params;
        switch (scope) {
            case 'user': {
                params = this.exportUserData(entity, id).then(res => res.toPromise());
                break;
            }
            case 'group': {
                params = this.exportGroupData(entity, id).toPromise();
                break;
            }
            case 'all': {
                params = this.exportAllData(entity).toPromise();
                break;
            }
        }
        return params;
    }


    async exportUserData(entity: string, user: string, group?: string) {
        let params;
        switch (entity) {
            case 'activities': {
                params = this.exportActivities(user);
                break;
            }
            case 'goals': {
                params = this.exportUserGoals(user);
                break;
            }
            case 'goalWins': {
                params = this.exportGoalWins(user);
                break;
            }
            case 'trophyWins': {
                params = this.exportWonTrophies(user);
                break;
            }
            case 'challengeWins': {
                params = this.exportWonTrophies(user);
                break;
            }
            case 'viewLogs': {
                params = this.exportViewLogs(user);
                break;
            }
            case 'actionLogs': {
                params = this.exportActionLogs(user);
                break;
            }
        }
        if (!group) {
            group = await this.db.database.ref('/users/' + user + '/group').once('value').then(res => res.val(), err => console.log(err));
        }
        return this.appendUserDetails(params, user, group);
    }

    appendUserDetails(dataRef: Observable<any>, user, group) {
        return dataRef.pipe(map(data => {
            return data.map(element => {
                element.id = user;
                element.group = group;
                return element;
            });
        }));
    }

    exportGroupData(entity: string, group: string) {
        return this.db.list<any>('/users/').snapshotChanges().pipe(first(), flatMap(
            users => {
                return forkJoin(users.filter(user => user.payload.val().group === group).map(user => {
                    return from(this.exportUserData(entity, user.key, user.payload.val().group)).pipe(flatMap(data => data));
                    // @ts-ignore
                })).pipe(map(results => results.flat()));
            }
        ));
    }

    exportAllData(entity: string) {
        // this.db.object<any>('/users/' + firebase.auth().currentUser.uid).snapshotChanges()
        //  .pipe(map(userSnapshot => User.fromFirebaseObject(firebase.auth().currentUser.uid, userSnapshot.payload.val())));

        return this.db.list<any>('/users/').snapshotChanges().pipe(first(), flatMap(
            users => {

                return forkJoin(users.map(user => {
                    return from(this.exportUserData(entity, user.key, user.payload.val().group)).pipe(flatMap(data => data));
                    // @ts-ignore
                })).pipe(map(results => results.flat()));
            }
        ));
    }

    exportActivities(user: string) {
        return this.db.list<any>('/activities/' + user).valueChanges().pipe(first());
    }

    exportDefaultGoals() {
        return new Promise(resolve => {
            resolve(Goal.defaultGoals);
        });
    }

    exportUserGoals(user: string) {
        return this.db.list<any>('/goals/' + user).valueChanges().pipe(first());
    }

    exportGoalWins(user: string) {
        return this.db.list<any>('/wins/' + user).snapshotChanges().pipe(first(), map(
            goals => goals.map(goal => {
                const entry = goal.payload.val();
                entry.goal = goal.key;
                return entry;
            })
        ));
    }

    exportTrophies() {
        return new Promise(resolve => {
            resolve(Trophy.defaultTrophies);
        });
    }

    exportWonTrophies(user: string) {
        return this.db.list<any>('/trophyStatus/' + user).valueChanges().pipe(first());
    }

    exportChallenges() {
        return this.db.list<any>('/challenges/').valueChanges().pipe(first());
    }

    exportWonChallenges(user: string) {

    }

    exportViewLogs(user: string) {
        return this.db.list<any>('/tracking/' + user + '/viewLogs').valueChanges().pipe(first());

    }

    exportActionLogs(user: string) {
        return this.db.list<any>('/tracking/' + user + '/actionLogs').valueChanges().pipe(first());

    }

}
