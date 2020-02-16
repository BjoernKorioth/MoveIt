import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';
import { Group } from '../model/group';

@Component({
  selector: 'app-appconfig-popover',
  templateUrl: './appconfig-popover.component.html',
  styleUrls: ['./appconfig-popover.component.scss'],
})
export class AppconfigPopoverComponent implements OnInit {

  groups: any;
  group: Group;
  user: User;
  UserConfig: any;
  constructor(public popoverController: PopoverController, private userService: UserService, private toastController: ToastController) { 

    this.userService.getGroups().subscribe(groups => this.groups = groups);
  }

  ngOnInit() {}

  
  createUser() {
    console.log(this.UserConfig);

    this.userService.createUser(this.UserConfig.id).then(
        res => {
          console.log(res);
          this.presentToast();
        },
        err => console.log(err)
    );
}

async presentToast() {
  const controller = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'OTP created successfully!',
      showCloseButton: true
  }).then(toast => {
      toast.present();
  });
}

}
