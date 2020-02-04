import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';


@Component({
    selector: 'app-rewards',
    templateUrl: './rewards.page.html',
    styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit, OnDestroy {

    constructor(private trackingService: TrackingService) {
    }

    viewLog: ViewLog;

    ngOnInit() {
        this.viewLog = this.trackingService.startRecordingViewTime('rewards');
    }

    ngOnDestroy() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
    }

}
