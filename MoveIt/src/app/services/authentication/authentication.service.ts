import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthenticateService {

  constructor(private fireStore: AngularFirestore){}

  registerUser(value){
    this.registerOnDatabase();
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(  
       res => resolve(res),
       err => reject(err))
   })
  }

  private registerOnDatabase(){
    return new Promise<any>((resolve, reject) => {
      let record =  {challengesActive:"{}", challengesWon:"{}",group: 2, name: "testName", trophiesWon:"{}", type:"user"};
      this.fireStore.collection('users').add(record).then(
        res => resolve(res),
        err => reject(err))});
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
 
