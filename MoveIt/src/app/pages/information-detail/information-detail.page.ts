import {Component, OnInit} from '@angular/core';
import {InformationService} from '../../services/information/information.service';
import {Information} from '../../model/information';
import { Location } from  '@angular/common';

@Component({
    selector: 'app-information-detail',
    templateUrl: './information-detail.page.html',
    styleUrls: ['./information-detail.page.scss'],
})
export class InformationDetailPage implements OnInit {
    static: any;
    dynamic: any;
    constructor(private informationService: InformationService, private location: Location) {
        this.location = location;
    
        this.static=[
            {
                title: 'moderate vs. vigorous',
                description: 'moderate activity'
            },
            {
                title: 'WHO Guidelines',
                description: 'moderate activity'
            },
        ]
    }

    ngOnInit() {
        this.getAllInformation();
    }

    goBack(){
        this.location.back();
      }

    // TODO For testing purposes only, only reserachers can create activities
    createInformation() {
        this.informationService.createInformation(new Information()).then(
            res => {
                console.log(res);
            },
            err => console.log(err));
    }

    // TODO For testing purposes only, only reserachers can edit activities
    editInformation() {
        this.informationService.editInformation('-LxazngpwtMfICMajpTv', new Information()).then(
            res => {
                console.log(res);
            },
            err => console.log(err));
    }

    // TODO For testing purposes only, only the detail view needs to get a single information
    getInformation() {
        this.informationService.getInformation('-LxazngpwtMfICMajpTv').then(
            res => {
                console.log(res);
            },
            err => console.log(err)
        );
    }

    /**
     * Retrieves an array of all activities of a current user
     */
    getAllInformation() {
        this.informationService.getAllInformation().then(
            res => {
                this.dynamic = res;
            },
            err => console.log(err)
        );
    }
}
