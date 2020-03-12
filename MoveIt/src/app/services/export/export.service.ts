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
    fields = [];

    constructor(private db: AngularFireDatabase) {
    }

    export(entity: string, scope?: string, id?: string) {
        let fetchData;

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
                    let csv = '';
                    if (params && Array.isArray(params) && params.length > 0) {
                        csv = parse(params);
                    }
                    this.download(entity + '_' + scope + '_' + id + '.csv', csv);
                } catch (err) {
                }
            },
            err => console.error(err)
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
                params = this.exportWonChallenges(user);
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
            case 'reactions': {
                params = this.exportReactions(user);
                break;
            }
        }
        if (!group) {
            group = await this.db.database.ref('/users/' + user + '/group').once('value').then(res => res.val(), err => console.error(err));
        }
        return this.appendUserDetails(params, user, group);
    }

    appendUserDetails(dataRef: Observable<any>, user, group) {
        return dataRef.pipe(map(data => {
            return data.map(element => {
                element.uid = user;
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
            goals => {
                // @ts-ignore
                return goals.flatMap(goal => {
                    const entry = goal.payload.val();
                    entry.goal = goal.key;
                    return entry.map(item => ({time: item, goal: goal.key}));
                });
            }
        ));
    }

    exportTrophies() {
        return new Promise(resolve => {
            resolve(Trophy.defaultTrophies);
        });
    }

    exportWonTrophies(user: string) {
        return this.db.list<any>('/trophyStatus/' + user).snapshotChanges().pipe(first(), map(
            // @ts-ignore
            trophiesList => trophiesList.flatMap(trophyCategory => {
                    const trophies = trophyCategory.payload.val();
                    if (trophyCategory.key === 'won') {
                        return trophies.map(trophy => ({
                            status: trophyCategory.key,
                            trophyId: trophy.id,
                            won: trophy.time
                        }));
                    } else {
                        return trophies.map(trophy => ({status: trophyCategory.key, trophyId: trophy, won: null}));
                    }
                })
        ));
    }

    exportChallenges() {
        return this.db.list<any>('/challenges/').snapshotChanges().pipe(first(), map(
            challenges => challenges.map(challenge => {
                const entry = challenge.payload.val();
                entry.id = challenge.key;
                return entry;
            })
        ));
    }

    exportWonChallenges(user: string) {
        return this.db.list<any>('/challengesStatus/' + user + '/won').valueChanges().pipe(first(), map(
            challenges => challenges.map(challenge => ({challenge}))
        ));
    }

    exportViewLogs(user: string) {
        return this.db.list<any>('/tracking/' + user + '/viewLogs').valueChanges().pipe(first());
    }

    exportActionLogs(user: string) {
        return this.db.list<any>('/tracking/' + user + '/actionLogs').valueChanges().pipe(first());

    }

    exportReactions(user: string) {
        return this.db.list<any>('/tracking/' + user + '/reactions').valueChanges().pipe(first());
    }

    download(filename, text) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    exportDb() {
        this.db.database.ref('/').once('value').then(
            res => {
                this.download(
                    'database_dump_' + (new Date()).toISOString().slice(0, 19).replace(/:/g, '-') + '.json',
                    JSON.stringify(res.val())
                );
            },
            err => console.log(err)
        );
    }
}
