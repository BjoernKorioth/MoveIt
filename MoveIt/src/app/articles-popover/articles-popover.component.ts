import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Information} from '../model/information';
import {InformationService} from '../services/information/information.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import { finalize, tap } from 'rxjs/operators';



export interface MyData {
    name: string;
    filepath: string;
    size: number;
}

@Component({
    selector: 'app-articles-popover',
    templateUrl: './articles-popover.component.html',
    styleUrls: ['./articles-popover.component.scss'],
})
export class ArticlesPopoverComponent implements OnInit {

    information: Information;
    private imageCollection: AngularFirestoreCollection<MyData>;
    public testUrl: Observable <String>
   

    constructor(private storage: AngularFireStorage, private database: AngularFirestore, public popoverController: PopoverController, private informationService: InformationService) {
        this.information = new Information();
        this.isUploading = false;
        this.isUploaded = false;

        // Set collection where our documents/ images info will save
        this.imageCollection = database.collection<MyData>('profilePic');
        this.images = this.imageCollection.valueChanges();
       
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
        const path = `AdminDashboard/${file.name}`;


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
                
                this.testUrl = fileRef.getDownloadURL();
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

    addInformation() {
        console.log(this.information);
        this.informationService.createInformation(this.information).then(
            (information) => {
                console.log(information);
                console.log(this.UploadedFileURL);
            })
            .catch(err => console.error(err)
            );
        // this.presentAlert();
    }
}
