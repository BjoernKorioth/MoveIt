import {Component, OnInit} from '@angular/core';
import {PopoverController, NavParams} from '@ionic/angular';
import {Information} from '../model/information';
import {InformationService} from '../services/information/information.service';
import { Trophy } from '../model/trophy';

@Component({
    selector: 'app-trophy-popover',
    templateUrl: './trophy-popover.component.html',
    styleUrls: ['./trophy-popover.component.scss'],
})
export class TrophyPopover implements OnInit {

    trophy: Trophy;


    constructor(public popoverController: PopoverController, private navParams: NavParams) {
        this.trophy = this.navParams.get("trophy");
    }

    ngOnInit() {
    }
}
