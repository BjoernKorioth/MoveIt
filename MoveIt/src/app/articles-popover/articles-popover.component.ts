import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Information} from '../model/information';
import {InformationService} from '../services/information/information.service';

@Component({
    selector: 'app-articles-popover',
    templateUrl: './articles-popover.component.html',
    styleUrls: ['./articles-popover.component.scss'],
})
export class ArticlesPopoverComponent implements OnInit {

    information: Information;


    constructor(public popoverController: PopoverController, private informationService: InformationService) {
        this.information = new Information();
    }

    ngOnInit() {
    }

    addInformation() {
        console.log(this.information);
        this.informationService.createInformation(this.information).then(
            (information) => {
                console.log(information);
            })
            .catch(err => console.error(err)
            );
        // this.presentAlert();
    }
}
