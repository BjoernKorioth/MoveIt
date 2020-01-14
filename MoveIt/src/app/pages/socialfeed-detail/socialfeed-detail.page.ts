import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import {PostService} from '../../services/post/post.service';
import {Observable} from 'rxjs';
import { analytics } from 'firebase';
import { Location } from  '@angular/common';

@Component({
  selector: 'app-socialfeed-detail',
  templateUrl: './socialfeed-detail.page.html',
  styleUrls: ['./socialfeed-detail.page.scss'],
})



export class SocialfeedDetailPage implements OnInit {
  

  posts: Observable<Post[]>;
  comments: Array<{userid:string, name:string, comment:string}> = [
    {
      userid: '1',
      name: 'Cindy',
      comment:'Awesome!'
    },
    {
      userid: '2',
      name: 'Mike',
      comment:'Really good :)'
    },
    {
      userid: '3',
      name: 'Alberto',
      comment:'Fantastic'
    }
  ];

  constructor(private postService: PostService, private location:Location) {
    this.location = location;
    this.posts = postService.getAllPosts();
    this.posts.subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

  getTimeDifference(date) {
    // return new Date() - new Date(date);
  }

  newPost() {
    const post = new Post();
    post.activity = 'asdf';

    this.postService.createPost(post).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  editPost() {
    this.postService.editPost('-LxfARsp_2al7-W3JYcf', new Post()).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  getPost() {
    this.postService.getPost('-LxfARsp_2al7-W3JYcf').then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  getAllPosts() {
    return this.postService.getAllPosts();
  }

  like() {
    this.postService.likePost('-LxfARsp_2al7-W3JYcf').then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  unlike() {
    this.postService.unlikePost('-LxfARsp_2al7-W3JYcf').then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  newComment() {
    var cUser = document.getElementsByTagName("input")[0].value;
    this.comments.push({ userid : '4' , name : 'Greg' ,comment: cUser});
    
    this.postService.createComment('-LxfARsp_2al7-W3JYcf', new Comment()).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  editComment() {
    this.postService.editComment('-LxfARsp_2al7-W3JYcf', '-LxfDHCgec1oZ268jioI', new Comment()).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  getComment() {
    this.postService.getComment('-LxfARsp_2al7-W3JYcf', '-LxfDHCgec1oZ268jioI').then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  getAllComments() {
    return this.postService.getAllComments('-LxfARsp_2al7-W3JYcf');
  }
}