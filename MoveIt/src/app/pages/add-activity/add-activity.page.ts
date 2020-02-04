import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
    selector: 'app-add-activity',
    templateUrl: './add-activity.page.html',
    styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit, OnDestroy {

    constructor(private trackingService: TrackingService) {
    }

    viewLog: ViewLog;

    ngOnInit() {
        this.viewLog = this.trackingService.startRecordingViewTime('add-activity');
    }

    ngOnDestroy() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
    }

}
