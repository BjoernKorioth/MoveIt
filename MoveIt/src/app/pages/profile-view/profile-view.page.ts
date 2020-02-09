import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {GoalService} from 'src/app/services/goal/goal.service';
import {Activity} from 'src/app/model/activity';
import {ActivityService} from 'src/app/services/activity/activity.service';
import {Goal} from '../../model/goal';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})

export class ProfileViewPage implements OnInit {
  currentUser: Observable<User>;
  activities: Observable<Activity[]>;
  goals: Observable<any>;
  goalStorage: Array<Goal>;
  private imageCollection: AngularFirestoreCollection<MyData>;
  age: any;
  username: Observable<any>;
  test: Observable<string>;
  usertest: string;
  usertestpath: string;


  constructor(private route:ActivatedRoute, private router:Router, private location: Location, private userService: UserService, private goalService: GoalService, private activityService: ActivityService, public alertController: AlertController, private storage: AngularFireStorage, private database: AngularFirestore) {
    
    this.route.queryParams.subscribe(params=>{
      var userid= JSON.parse(params.special)
      this.activities = this.activityService.getThisUsersActivities(userid);
      this.goals = this.goalService.getGoalsFromUser(userid);
      this.goals.subscribe(goals => this.goalStorage = goals);

      // Set collection where our documents/ images info will save
      this.imageCollection = database.collection<MyData>('profilePic');
      this.images = this.imageCollection.valueChanges();
      //  this.storage.ref(path)
      this.usertestpath = `profilePic/${userid}`;
      // this.router = router;
      this.currentUser = this.userService.getUserById(userid);
    })
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

  ngOnInit() {
  }

  goBack() {
      this.location.back();
  }

}
