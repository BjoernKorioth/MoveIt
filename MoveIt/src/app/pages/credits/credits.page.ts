import { Component, OnInit } from '@angular/core';
import { Location } from  '@angular/common';


@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements OnInit {

  constructor(private location: Location) {
    this.location = location;
   }

  ngOnInit() {
  }

  
  goBack(){
    this.location.back();
  }

}
