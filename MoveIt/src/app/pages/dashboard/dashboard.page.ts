import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

    constructor(private trackingService: TrackingService) {
    }

    viewLog: ViewLog;

    ngOnInit() {
        this.viewLog = this.trackingService.startRecordingViewTime('dashboard');
    }

    ngOnDestroy() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
    }

}
