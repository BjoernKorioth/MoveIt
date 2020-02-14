import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-credits-detail',
  templateUrl: './credits-detail.page.html',
  styleUrls: ['./credits-detail.page.scss'],
})
export class CreditsDetailPage implements OnInit {

  constructor(private location: Location, private router: Router) { 

    this.location = location;
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}


