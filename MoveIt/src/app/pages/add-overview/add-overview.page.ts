import { Component, OnInit } from '@angular/core';
import { Location } from  '@angular/common';

@Component({
  selector: 'app-add-overview',
  templateUrl: './add-overview.page.html',
  styleUrls: ['./add-overview.page.scss'],
})
export class AddOverviewPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }
}
