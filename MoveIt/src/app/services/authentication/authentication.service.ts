import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AuthenticateService {

  constructor(private fireDatabase: AngularFireDatabase){}

  registerUser(value){
    this.registerOnDatabase();
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(  
       res => resolve(res),
       err => reject(err))
   })
  }

   registerOnDatabase(){
      let record =  {challengesActive:"{}", challengesWon:"{}", group: 2, name: "testName", trophiesWon:"{}", type:"user" };
      console.log(record);
      return this.fireDatabase.list("/users").push(record);
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
}
 
