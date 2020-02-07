import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit, OnDestroy {

  constructor(private trackingService: TrackingService) {
  }

  viewLog: ViewLog;

  ngOnInit() {
    this.viewLog = this.trackingService.startRecordingViewTime('information');
  }

  ngOnDestroy() {
    this.trackingService.stopRecordingViewTime(this.viewLog);
  }

}
