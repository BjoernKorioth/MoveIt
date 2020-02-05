import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {parse} from 'json2csv';
import {first, flatMap, map} from 'rxjs/operators';
import {forkJoin, from, Observable, of} from 'rxjs';
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
                fetchData = this.exportChallenges();
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
                // @ts-ignore
              return forkJoin(users.filter(user => user.payload.val().group === group).map(user => {
                    return from(this.exportUserData(entity, user.key, user.payload.val().group)).pipe(flatMap(data => data));
                })).pipe(map(results => results.flat()));
            }
        ));
    }

    exportAllData(entity: string) {
        // this.db.object<any>('/users/' + firebase.auth().currentUser.uid).snapshotChanges()
        //  .pipe(map(userSnapshot => User.fromFirebaseObject(firebase.auth().currentUser.uid, userSnapshot.payload.val())));

        return this.db.list<any>('/users/').snapshotChanges().pipe(first(), flatMap(
            users => {
                // @ts-ignore
              return forkJoin(users.map(user => {
                    return from(this.exportUserData(entity, user.key, user.payload.val().group)).pipe(flatMap(data => data));
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
        return of({fields: [], data: []});
    }

    exportGoalWins(user: string) {
        return of({fields: [], data: []});
    }

    exportTrophies() {
        return new Promise(resolve => {
            resolve(Trophy.defaultTrophies);
        });
    }

    exportWonTrophies(user: string) {
        return of({fields: [], data: []});
    }

    exportChallenges() {
        return of({fields: [], data: []});
    }

    exportWonChallenges(user: string) {

    }

    exportViewLogs(user: string) {

    }

    exportActionLogs(user: string) {

    }

}
