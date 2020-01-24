import { Component, OnInit } from '@angular/core';
import { Location } from  '@angular/common';

@Component({
  selector: 'app-goals-detail',
  templateUrl: './goals-detail.page.html',
  styleUrls: ['./goals-detail.page.scss'],
})
export class GoalsDetailPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }
  

}
