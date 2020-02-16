import {Component, OnInit} from '@angular/core';
import {Information} from '../../model/information';
import {Observable, of} from 'rxjs';
import {InformationService} from '../../services/information/information.service';
import {AlertController, ToastController} from '@ionic/angular';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {finalize, tap, catchError} from 'rxjs/operators';
import * as firebase from 'firebase';


import {PopoverController} from '@ionic/angular';
import {ArticlesPopoverComponent} from 'src/app/articles-popover/articles-popover.component';
import { AngularFireDatabase } from '@angular/fire/database';

export interface MyData {
    name: string;
    filepath: string;
    size: number;
}


@Component({
    selector: 'app-admin-dashboard-articles',
    templateUrl: './admin-dashboard-articles.page.html',
    styleUrls: ['./admin-dashboard-articles.page.scss'],
})
export class AdminDashboardArticlesPage implements OnInit {
    articlesObserve: Observable<Information[]>;
    articles: Array<Information>;
    information: Information;
    private imageCollection: AngularFirestoreCollection<MyData>;
 
    infoID: String;

    constructor(private storage: AngularFireStorage, private toastController: ToastController, private database: AngularFirestore, private db: AngularFireDatabase, private informationService: InformationService, public popoverController: PopoverController) {
        this.articlesObserve = this.informationService.getAllInformation();
        this.articlesObserve.subscribe(result => this.updateAllInformation(result));
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

    async presentToast() {
        const controller = await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Article edited successfully!',
            showCloseButton: true
        }).then(toast => {
            toast.present();
        });
      }

    editArticle(article: Information) {
        console.log(article);
        this.informationService.editInformation(article.id, article).then(
            res => {
                console.log(res);
                this.presentToast();
            },
            err => console.log(err)
        );
    }

    deleteArticle(article: Information) {
        console.log(article);
        this.informationService.deleteInformation(article.id).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    updateAllInformation(newInformation: Array<Information>) {
        this.articles = newInformation;
    }

    async presentPopover(event) {
        const popover = await this.popoverController.create({
            component: ArticlesPopoverComponent,
            event
        });
        return await popover.present();
    }

    uploadFile(event: FileList, id: string) {


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
        const path = `AdminDashboard/${id}`;

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
                    return this.db.database.ref('/information/' + id + '/picture').set(resp).then(
                        res => console.log(res),
                        err => console.log(err)
                    );
                    
                }, error => {
                    console.error(error);
                });
            }),
            tap(snap => {
                this.fileSize = snap.totalBytes;
                console.log(snap);
            }),
            catchError(error => of(error))
        );
        this.snapshot.subscribe(val => console.log(val));
    }

    addPictureToInfo(pictureUrl: string, infoID: string) {
        return this.db.database.ref('/information/' + infoID + '/picture').set(pictureUrl);
   
       
    }



    ngOnInit() {
    }

    addInformation() {
        console.log(this.information);
        this.informationService.createInformation(this.information).then(
            (information) => {
                console.log(information);
            })
            .catch(err => console.error(err)
            );
        // this.presentAlert();
    }

}
