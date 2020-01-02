import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard-detail',
  templateUrl: './leaderboard-detail.page.html',
  styleUrls: ['./leaderboard-detail.page.scss'],
})
export class LeaderboardDetailPage implements OnInit {
  persons: any;
  constructor() {
  this.persons = [
    {
      name: 'Maya',
      age: 20,
      actMinutes: 150,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Ursula',
      age: 25,
      actMinutes: 120,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Phil',
      age: 40,
      actMinutes: 115,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Mary',
      age: 25,
      actMinutes: 100,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Maya',
      age: 20,
      actMinutes: 150,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Ursula',
      age: 25,
      actMinutes: 120,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Phil',
      age: 40,
      actMinutes: 115,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Mary',
      age: 25,
      actMinutes: 100,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Maya',
      age: 20,
      actMinutes: 150,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Ursula',
      age: 25,
      actMinutes: 120,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Phil',
      age: 40,
      actMinutes: 115,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Mary',
      age: 25,
      actMinutes: 100,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Maya',
      age: 20,
      actMinutes: 150,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Ursula',
      age: 25,
      actMinutes: 120,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Phil',
      age: 40,
      actMinutes: 115,
      image: './assets/Profilbild.jpg'
    },
    {
      name: 'Mary',
      age: 25,
      actMinutes: 100,
      image: './assets/Profilbild.jpg'
    }
  ];
  }

  ngOnInit() {
  }

}
