import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Information} from '../../model/information';
import * as firebase from 'firebase/app';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InformationService {
    informationLocation = '/information/';

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    /**
     * Creates a new information in firebase from an information object
     *
     * @param information an existing information object
     */

    createInformation(information: Information) {
        return new Promise<any>((resolve, reject) => {
            const id = firebase.database().ref().child('information').push().key;
            information.id = id;
            information.createdAt = new Date();

            this.fireDatabase.database.ref('/information/').child(id)
                .set(information.toFirebaseObject()).then(
                // Returns the information with the new id
                () => resolve(information),
                err => reject(err)
            );
        });
    }

    /**
     * Updates an information in firebase
     *
     * @param informationId the id of the information to be edited
     * @param information the updated/new information
     */
    editInformation(informationId, information: Information) {
        console.log(information);
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase.database.ref('/information/').child(informationId).set(information.toFirebaseObject()).then(
                res => resolve(res),
                err => reject(err)
            );
        });
    }


    /**
     * Retrieves an information from firebase
     *
     * @param informationId id of the information
     */
    getInformation(informationId) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('/information/').child(informationId).once('value').then(
                snapshot => {
                    const data = snapshot.val();
                    // Convert the data to an information object and return it
                    resolve(Information.fromFirebaseObject(informationId, data));
                },
                err => reject(err)
            );
        });
    }

    /**
     * Retrieve all information
     */
    getAllInformation() {
        const ref = this.fireDatabase.list<any>(this.informationLocation);
        return ref.snapshotChanges().pipe(map(information => information.map(
            infoSnapshot => Information.fromFirebaseObject(infoSnapshot.key, infoSnapshot.payload.val()))));
    }

    /**
     * Deletes an information from firebase
     *
     * @param informationId id of the information
     */
    deleteInformation(informationId) {
        return this.fireDatabase.database.ref('/information/' + informationId).remove();
    }
}
