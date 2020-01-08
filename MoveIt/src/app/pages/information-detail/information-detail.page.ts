import {Component, OnInit} from '@angular/core';
import {InformationService} from '../../services/information/information.service';
import {Information} from '../../model/information';

@Component({
    selector: 'app-information-detail',
    templateUrl: './information-detail.page.html',
    styleUrls: ['./information-detail.page.scss'],
})
export class InformationDetailPage implements OnInit {

    constructor(private informationService: InformationService) {
    }

    ngOnInit() {
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
                console.log(res);
            },
            err => console.log(err)
        );
    }
}
