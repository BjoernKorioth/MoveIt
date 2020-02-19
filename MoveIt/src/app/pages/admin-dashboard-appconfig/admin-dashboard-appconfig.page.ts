import {Component, OnInit} from '@angular/core';
import {PopoverController, ToastController} from '@ionic/angular';
import {AppconfigPopoverComponent} from 'src/app/appconfig-popover/appconfig-popover.component';
import {AppconfigGroupPopoverComponent} from 'src/app/appconfig-group-popover/appconfig-group-popover.component';
import {UserService} from '../../services/user/user.service';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {Group} from '../../model/group';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'app-admin-dashboard-appconfig',
    templateUrl: './admin-dashboard-appconfig.page.html',
    styleUrls: ['./admin-dashboard-appconfig.page.scss'],
})
export class AdminDashboardAppconfigPage implements OnInit {
    groups: Observable<Array<any>>;
    allGroups: Group[];
 //   otps: Observable<Array<any>>;
    otps: any[];
    users: Observable<Array<User>>;
    //feature: string;
    checkedFeature: any[] =[];
    features: any[]  = [
        {
          val: 'Leaderboard',
          isChecked: false
        },
        {
          val: 'Social',
          isChecked: false
        },
        {
          val: 'Rewards',
          isChecked: false
        }
      ];

    constructor(public popoverController: PopoverController, private userService: UserService, private toastController: ToastController) {
        this.users = this.userService.getUsers();
        //this.groups = this.userService.getGroups();
        this.userService.getOTPs().subscribe(data =>{
           this.otps = data;
           console.log(this.otps);
          });
        // For debugging observables:
        this.users.subscribe(val => console.log(val));

        let that = this;
        this.userService.getGroups().subscribe(val =>{ 
          console.log(val);
            this.allGroups = val,
            this.allGroups.forEach(function(group){
              //  group.featureVector = this.features;

              that.features.forEach(function(feature){
                feature = {
                    val: feature.val,
                    isChecked: group.featureVector.includes(feature.val),
                    }
                    that.checkedFeature.push(feature);
                });
                group.featureVector = that.checkedFeature;
                that.checkedFeature = [];

        })                    
       });
      //  this.otps.subscribe(val => console.log(val));
    }

    
    async presentToastGroup() {
        const controller = await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Group edited successfully!',
            showCloseButton: true
        }).then(toast => {
            toast.present();
        });
      }

      async presentToast() {
        const controller = await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Userconfig edited successfully!',
            showCloseButton: true
        }).then(toast => {
            toast.present();
        });
      }

    async presentPopoverGroup(event) {
        const popover = await this.popoverController.create({
            component: AppconfigGroupPopoverComponent,
            event
        });
        return await popover.present();
    }

    async presentPopover(event) {
        const popover = await this.popoverController.create({
            component: AppconfigPopoverComponent,
            event
        });
        return await popover.present();
    }

    createUser(groupID = 'Group Test') {
        this.userService.createUser(groupID).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    editUserconfig(userID, groupID) {
        this.userService.changeUserGroup(userID, groupID).then(
            res => 
            {
                console.log(res);
                this.presentToast();
            },
            err => console.log(err)
        );
    }

    createGroup(groupName: string, featureVector: Array<string>) {
        this.userService.createGroup(new Group('', 'Group Test', ['Leaderboard', 'Social', 'Rewards'])).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    /*editGroup(groupId: string, groupName: string, featureVector: Array<boolean>) {
        this.userService.editGroup(new Group('-LzlWHaBPXL4vdLrbEtF', 'New Name', [false, false, false, false])).then(
            res => console.log(res),
            err => console.log(err)
        );
    }*/

    editGroup(group: Group) {

        let checkFeatures = group.featureVector.filter(function(feature) {
            return feature.isChecked;
          });
      
          group.featureVector = checkFeatures.map(function(feature) {
            return feature.val;
          });

        console.log(group);
        this.userService.editGroup(group).then(
            res => {
                console.log(res);
                this.presentToastGroup();
            },
            err => console.log(err)
        );
    }

    ngOnInit() {
    }
}
