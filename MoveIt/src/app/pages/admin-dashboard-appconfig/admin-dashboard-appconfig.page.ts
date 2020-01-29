import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {AppconfigPopoverComponent} from 'src/app/appconfig-popover/appconfig-popover.component';
import {AppconfigGroupPopoverComponent} from 'src/app/appconfig-group-popover/appconfig-group-popover.component';
import {UserService} from '../../services/user/user.service';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {Group} from '../../model/group';


@Component({
    selector: 'app-admin-dashboard-appconfig',
    templateUrl: './admin-dashboard-appconfig.page.html',
    styleUrls: ['./admin-dashboard-appconfig.page.scss'],
})
export class AdminDashboardAppconfigPage implements OnInit {
    groups: Observable<Array<any>>;
    otps: Observable<Array<any>>;
    users: Observable<Array<User>>;

    constructor(public popoverController: PopoverController, private userService: UserService) {
        this.users = this.userService.getUsers();
        this.groups = this.userService.getGroups();
        this.otps = this.userService.getOTPs();
        // For debugging observables:
        this.users.subscribe(val => console.log(val));
        this.groups.subscribe(val => console.log(val));
        this.otps.subscribe(val => console.log(val));
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

    changeUserGroup(userID = 'Z8JGy8blwFav6P8LzDlt5vh8ESJ3', groupID = '-LzlWHaBPXL4vdLrbEtF') {
        this.userService.changeUserGroup(userID, groupID).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    createGroup(groupName: string, featureVector: Array<boolean>) {
        this.userService.createGroup(new Group('', 'Group Test', [true, true, true, true])).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    editGroup(groupId: string, groupName: string, featureVector: Array<boolean>) {
        this.userService.editGroup(new Group('-LzlWHaBPXL4vdLrbEtF', 'New Name', [false, false, false, false])).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    ngOnInit() {
    }
}
