import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {GoalService} from 'src/app/services/goal/goal.service';
import {Activity} from 'src/app/model/activity';
import {ActivityService} from 'src/app/services/activity/activity.service';
import {Goal} from '../../model/goal';
import {User} from '../../model/user';
import {Observable, merge} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {finalize, tap, map} from 'rxjs/operators';
import * as firebase from 'firebase';
import {UserService} from '../../services/user/user.service';

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
    currentUser: Observable<User>;
    activities: Observable<Activity[]>;
    displayedActivities: Observable<Activity[]>;
    goals: Observable<any>;
    goalStorage: Array<Goal>;
    private imageCollection: AngularFirestoreCollection<MyData>;
    age: any;

    username: Observable<any>;
    test: Observable<string>;
    usertest: string;
    usertestpath: string;


    constructor(private location: Location, private userService: UserService, private goalService: GoalService, private activityService: ActivityService, public alertController: AlertController, private storage: AngularFireStorage, private database: AngularFirestore) {
        this.activities = this.activityService.getAllUserActivities();
        this.goals = this.goalService.getGoals();
        this.goals.subscribe(goals => this.goalStorage = goals);
        this.isUploading = false;
        this.isUploaded = false;

        // Set collection where our documents/ images info will save
        this.imageCollection = database.collection<MyData>('profilePic');
        this.images = this.imageCollection.valueChanges();
        this.username = this.userService.getUsername();
        this.usertest = firebase.auth().currentUser.uid;
        //  this.storage.ref(path)
        this.usertestpath = `profilePic/${firebase.auth().currentUser.uid}`;
        // this.router = router;
        this.currentUser = this.userService.getUser();

        this.displayedActivities = this.activities.pipe(map(
            (data) => {
               // data.sort((a, b) => {
                 //   return b.startTime.getTime() - a.startTime.getTime();
                //});
                return data.slice(0, 5);
            }
        ));

    }

// Upload Task
    task: AngularFireUploadTask;

// Progress in percentage
    percentage: Observable<number>;

// Snapshot of uploading file
    snapshot: Observable<any>;

// Uploaded File URL
    UploadedFileURL: Observable<string>;

// Uploaded Image List
    images: Observable<MyData[]>;

// File details
    fileName: string;
    fileSize: number;

// Status check
    isUploading: boolean;
    isUploaded: boolean;

    calculateAge(birthday: Date) {
        const timeDiff = Math.abs(Date.now() - birthday.getTime());
        return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

    }

    loadMoreActivities() {
        let currentlyDisplayed = 0;
        this.displayedActivities.subscribe(
            c => currentlyDisplayed = c.length
        );

        const newDisplayedActivities = this.activities.pipe(
            map(data => data.slice(0, currentlyDisplayed + 5))
        );

        this.displayedActivities = merge(
            this.displayedActivities,
            newDisplayedActivities
        );
    }


    uploadFile(event: FileList) {


        // The File object
        const file = event.item(0);

        // Validation for Images Only
        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :( ');
            return;
        }

        this.isUploading = true;
        this.isUploaded = false;


        this.fileName = file.name;

        // The storage path
        const path = `profilePic/${firebase.auth().currentUser.uid}`;


        // File reference
        const fileRef = this.storage.ref(path);

        // The main task
        this.task = this.storage.upload(path, file);

        // Get file progress percentage
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(
            finalize(() => {
                // Get uploaded file storage path
                this.UploadedFileURL = fileRef.getDownloadURL();

                this.UploadedFileURL.subscribe(resp => {
                    this.addImagetoDB({
                        name: file.name,
                        filepath: resp,
                        size: this.fileSize
                    });
                    this.isUploading = false;
                    this.isUploaded = true;
                }, error => {
                    console.error(error);
                });
            }),
            tap(snap => {
                this.fileSize = snap.totalBytes;
            })
        );
    }

    addImagetoDB(image: MyData) {
        // Create an ID for document
        const id = this.database.createId();

        // Set document id with value in database
        this.imageCollection.doc(id).set(image).then(resp => {
            console.log(resp);
        }).catch(error => {
            console.log('error ' + error);
        });
    }


    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }


}
