import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-appconfig-popover',
  templateUrl: './appconfig-popover.component.html',
  styleUrls: ['./appconfig-popover.component.scss'],
})
export class AppconfigPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

}
