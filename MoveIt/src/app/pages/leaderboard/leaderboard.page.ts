import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackingService} from '../../services/tracking/tracking.service';
import {ViewLog} from '../../model/viewLog';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit, OnDestroy {

  constructor(private trackingService: TrackingService) {
  }

  viewLog: ViewLog;

  ngOnInit() {
    this.viewLog = this.trackingService.startRecordingViewTime('leaderboard');
  }

  ngOnDestroy() {
    this.trackingService.stopRecordingViewTime(this.viewLog);
  }

}
