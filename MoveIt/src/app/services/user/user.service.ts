import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  constructor(private db: AngularFireDatabase) {
  }

  // BK: returns the group the user is assigened to. Will be used in menu.page.ts
  getUsergroup() {
      return this.db.object<string>('/users/' + firebase.auth().currentUser.uid + '/group').valueChanges();
  }

  getGroupconfig(groupId){
    return this.db.object<string>('/groups/' + groupId + '/featureVector').valueChanges();
  }

}
