import {Component, OnInit} from '@angular/core';
import {InformationService} from '../../services/information/information.service';
import { Location } from  '@angular/common';

@Component({
    selector: 'app-information-single',
    templateUrl: './information-single.page.html',
    styleUrls: ['./information-single.page.scss'],
})
export class InformationSinglePage implements OnInit {

    constructor(private informationService: InformationService, private location: Location) {
    this.location = location;
    }

    ngOnInit() {
    }

    goBack(){
        this.location.back();
      }

  /**
   * Retrieve an information given its id
   */
    getInformation() {
        this.informationService.getInformation('asdf').then(
            res => {
                console.log(res);
            },
            err => console.log(err)
        );
    }
}
