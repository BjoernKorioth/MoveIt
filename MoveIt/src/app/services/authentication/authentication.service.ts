import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {User} from '../../model/user';



@Injectable()
export class AuthenticateService {

  private user: User;

  private list : AngularFireList<any>;

  constructor(private fireDatabase: AngularFireDatabase){}

  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(  
       res => resolve(res),
       err => reject(err),)
   })
  }

   registerOnDatabase(value){
      let record =  {uid: firebase.auth().currentUser.uid , challengesActive:"{}", challengesWon:"{}", group: 2, name: value.surname+", " +value.firstname, trophiesWon:"{}", type:"user" };
      console.log(record);
      console.log("Test "+ this.fireDatabase.list("/users"));
      
      this.fireDatabase.database.ref().child('users').child(firebase.auth().currentUser.uid).set(record);
      
  }

  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  userDetails(){
    return firebase.auth().currentUser;
  }

  loggedUserDetails(){
    return this.user;
  }
}
 
