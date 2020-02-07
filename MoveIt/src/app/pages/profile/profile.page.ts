import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

    constructor(private trackingService: TrackingService) {
    }

    viewLog: ViewLog;

    ngOnInit() {
        this.viewLog = this.trackingService.startRecordingViewTime('profile');
    }

    ngOnDestroy() {
        this.trackingService.stopRecordingViewTime(this.viewLog);
    }

}
