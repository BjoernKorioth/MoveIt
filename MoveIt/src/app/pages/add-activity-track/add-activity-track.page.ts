import { Component, OnInit } from '@angular/core';
import {Activity} from '../../model/activity';
import {ActivityService} from '../../services/activity/activity.service';
import { Location } from  '@angular/common';

@Component({
  selector: 'app-add-activity-track',
  templateUrl: './add-activity-track.page.html',
  styleUrls: ['./add-activity-track.page.scss'],
})
export class AddActivityTrackPage implements OnInit {
  activity: Activity;
  minutes: number;
  counter: number;
  types: Array<string>;
  intensities: Array<string>;
 // percent:number = 0;
 // radius:number = 100;

  //fullTime: any = '00:01:30';
  //timer: any = false;
  //progress: any = false;
  //minutes2:number = 1;
  //seconds: any = 30;
  elapsed:any = {
    h: '00',
    m: '00',
    s: '00'
  }
  overallTimer: any = false;


  constructor(private activityService: ActivityService, private location: Location) {
    this.activity = new Activity();
    this.location = location;
    this.types = Activity.types;
    this.intensities = Activity.intensities;

  }

  goBack(){
    this.location.back();
  }

  ngOnInit() {
  }

  addActivity() {
    this.activity.startTime = new Date(0);
    this.activity.endTime = new Date(this.minutes * 60 * 1000);
    this.activityService.createActivity(this.activity).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  startTimer(){

   /* if(this.timer){
      clearInterval(this.timer);
    }*/
    if(!this.overallTimer){
      this.progressTimer();
    }

    /*this.timer = false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.fullTime.split(':');
    this.minutes2 = timeSplit[1];
    this.seconds = timeSplit[2];

    let totalSeconds = Math.floor(this.minutes2 * 60) + parseInt(this.seconds);
    
    this.timer = setInterval(() => {
     if(this.percent == this.radius){
        clearInterval(this.timer);
      }
     // this.percent = Math.floor((this.progress / totalSeconds) * 100);
      this.progress++;
    }, 1000)*/
  }

  progressTimer(){
    let countDownDate = new Date();

    this.overallTimer = setInterval(() => {
      let now = new Date().getTime();
      let distance = now - countDownDate.getTime();

      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / (1000));

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);

    }, 1000)
  }

  progressTimer2(){

    let countDownDate = new Date();

    console.log(this.elapsed.s);
    this.overallTimer = setInterval(() => {
      let now = new Date().getTime();
      let distance = now - countDownDate.getTime();
      console.log(this.elapsed.s);
      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = this.elapsed.s.toInteger() + Math.floor((distance % (1000 * 60)) / (1000));

 

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);

    }, 1000)
  }

  pauseTimer(){
    clearInterval(this.overallTimer);
    this.overallTimer = false;
    console.log(this.elapsed.s);
  }

  startAgain(){
    this.overallTimer = true;
    this.progressTimer2();
  }

  pad(num, size) {
    let s = num+"";
    while(s.length < size) s = "0" + s;
    return s;
  }

  stopTimer(){
    //clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.overallTimer = false;
    //this.timer = false;
    //this.percent = 0;
    //this.progress = 0;
    this.elapsed = {
      h:'00',
      m:'00',
      s:'00'
    }
  }


}
