import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-rewards-overview',
  templateUrl: './rewards-overview.page.html',
  styleUrls: ['./rewards-overview.page.scss'],
})
export class RewardsOverviewPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  
  goBack() {
    this.location.back();
}

}
