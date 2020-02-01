import { Component, OnInit } from '@angular/core';
import { Location } from  '@angular/common';
import { GoalService } from 'src/app/services/goal/goal.service';
import { Activity } from 'src/app/model/activity';
import { ActivityService } from 'src/app/services/activity/activity.service';
import {Goal} from '../../model/goal';
import {Observable} from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { finalize, tap } from 'rxjs/operators';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})




export class ProfileDetailPage implements OnInit {
  activities: Observable<Activity[]>;
  goals: Observable<any>;
  goalStorage: Array<Goal>;
  private imageCollection: AngularFirestoreCollection<MyData>

  constructor(private location:Location, private goalService: GoalService, private activityService: ActivityService, public alertController: AlertController, private storage: AngularFireStorage, private database: AngularFirestore) { 
    this.activities = this.activityService.getAllUserActivities();
    this.goals = this.goalService.getGoals();
    this.goals.subscribe(goals => this.goalStorage = goals);
    this.isUploading = false;
    this.isUploaded= false; 
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
    //this.router = router;
  }

// Upload Task 
task: AngularFireUploadTask;
 
// Progress in percentage
percentage: Observable<number>;

// Snapshot of uploading file
snapshot: Observable<any>;

// Uploaded File URL
UploadedFileURL: Observable<string>;

//Uploaded Image List
images: Observable<MyData[]>;

//File details  
fileName:string;
fileSize:number;

//Status check 
isUploading:boolean;
isUploaded:boolean;




uploadFile(event: FileList) {
  

  // The File object
  const file = event.item(0)

  // Validation for Images Only
  if (file.type.split('/')[0] !== 'image') { 
   console.error('unsupported file type :( ')
   return;
  }

  this.isUploading = true;
  this.isUploaded = false;


  this.fileName = file.name;

  // The storage path
  const path = `freakyStorage/${new Date().getTime()}_${file.name}`;

  // Totally optional metadata
  const customMetadata = { app: 'Freaky Image Upload Demo' };

  //File reference
  const fileRef = this.storage.ref(path);

  // The main task
  this.task = this.storage.upload(path, file, { customMetadata });

  // Get file progress percentage
  this.percentage = this.task.percentageChanges();
  this.snapshot = this.task.snapshotChanges().pipe(
    
    finalize(() => {
      // Get uploaded file storage path
      this.UploadedFileURL = fileRef.getDownloadURL();
      
      this.UploadedFileURL.subscribe(resp=>{
        this.addImagetoDB({
          name: file.name,
          filepath: resp,
          size: this.fileSize
        });
        this.isUploading = false;
        this.isUploaded = true;
      },error=>{
        console.error(error);
      })
    }),
    tap(snap => {
        this.fileSize = snap.totalBytes;
    })
  )
}

addImagetoDB(image: MyData) {
  //Create an ID for document
  const id = this.database.createId();

  //Set document id with value in database
  this.imageCollection.doc(id).set(image).then(resp => {
    console.log(resp);
  }).catch(error => {
    console.log("error " + error);
  });
}



  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Edit Profile Information',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          value:'name',
          placeholder: 'Name'
        },
        // input date with min & max
        {
          name: 'BirthDate',
          type: 'date',
          value: '5.3.1994'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }




  

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }


}
