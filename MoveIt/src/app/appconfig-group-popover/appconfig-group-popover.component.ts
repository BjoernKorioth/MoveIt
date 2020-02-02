import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Group } from '../model/group';

@Component({
  selector: 'app-appconfig-group-popover',
  templateUrl: './appconfig-group-popover.component.html',
  styleUrls: ['./appconfig-group-popover.component.scss'],
})
export class AppconfigGroupPopoverComponent implements OnInit {

  group: Group;
  feature1: string = "Leaderboard";
  feature2: string = "Social";
  feature3: string = "Rewards";

  constructor(public popoverController: PopoverController, private userService: UserService) { 
    this.group = new Group();

  // this.group.enableFeature()
  }

  ngOnInit() {}

  createGroup(groupName: string, featureVector: Array<string>) {
    console.log(this.group.featureVector);
    this.userService.createGroup(this.group).then(
        res => console.log(res),
        err => console.log(err)
    );
}

}
