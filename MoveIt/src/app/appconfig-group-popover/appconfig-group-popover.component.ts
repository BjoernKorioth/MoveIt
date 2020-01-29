import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-appconfig-group-popover',
  templateUrl: './appconfig-group-popover.component.html',
  styleUrls: ['./appconfig-group-popover.component.scss'],
})
export class AppconfigGroupPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

}
