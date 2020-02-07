import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit, OnDestroy {

  constructor(private trackingService: TrackingService) {
  }

  viewLog: ViewLog;

  ngOnInit() {
    this.viewLog = this.trackingService.startRecordingViewTime('progress');
  }

  ngOnDestroy() {
    this.trackingService.stopRecordingViewTime(this.viewLog);
  }

}
