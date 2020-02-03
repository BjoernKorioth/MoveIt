import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
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
  constructor(public popoverController: PopoverController, private userService: UserService) { 

    this.userService.getGroups().subscribe(groups => this.groups = groups);
  }

  ngOnInit() {}

  
  createUser() {
    console.log(this.UserConfig);

    this.userService.createUser(this.UserConfig.id).then(
        res => console.log(res),
        err => console.log(err)
    );
}

}
