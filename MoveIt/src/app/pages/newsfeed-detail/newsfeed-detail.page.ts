import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed-detail',
  templateUrl: './newsfeed-detail.page.html',
  styleUrls: ['./newsfeed-detail.page.scss'],
})
export class NewsfeedDetailPage implements OnInit {
posts: any;
  constructor() { 
    this.posts = [
      {
        name: 'Phil',
        date: "20. December 2019",
        content: "Phil ran 10 km.",
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Cindy',
        date: "18. December 2019",
        content: "Cindy cycled 20 km.",
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Mark',
        date: "18. December 2019",
        content: "Mark ran 15 km.",
        image: './assets/Profilbild.jpg'
      },
      {
        name: 'Anna',
        date: "17. December 2019",
        content: "Anna did 100 minutes of yoga.",
        image: './assets/Profilbild.jpg'
      }
    ]
  }

  ngOnInit() {
  }

}
