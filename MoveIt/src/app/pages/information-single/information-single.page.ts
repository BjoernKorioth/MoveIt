import {Component, OnInit} from '@angular/core';
import {InformationService} from '../../services/information/information.service';
import { Location } from  '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-information-single',
    templateUrl: './information-single.page.html',
    styleUrls: ['./information-single.page.scss'],
})
export class InformationSinglePage implements OnInit {

    data:any;

    constructor(private informationService: InformationService, private location: Location, private route:ActivatedRoute, private router:Router) {
    this.location = location;
    this.route.queryParams.subscribe(params=>{
        this.data = JSON.parse(params.special);
    })
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
