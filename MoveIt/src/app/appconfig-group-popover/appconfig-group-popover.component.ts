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
  features: Array<any> = [
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

  constructor(public popoverController: PopoverController, private userService: UserService) { 
    this.group = new Group();
  }

  ngOnInit() {}

  createGroup() {
    console.log(this.features);

    let checkedFeatures = this.features.filter(function(feature) {
      return feature.isChecked;
    });

    this.group.featureVector = checkedFeatures.map(function(feature) {
      return feature.val;
    });

    this.userService.createGroup(this.group).then(
      res => console.log(res),
      err => console.log(err)
  );
}

}
