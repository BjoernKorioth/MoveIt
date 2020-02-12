import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-credits-detail',
  templateUrl: './credits-detail.page.html',
  styleUrls: ['./credits-detail.page.scss'],
})
export class CreditsDetailPage implements OnInit {

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}


