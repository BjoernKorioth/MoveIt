import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import {PostService} from '../../services/post/post.service';

@Component({
  selector: 'app-socialfeed-detail',
  templateUrl: './socialfeed-detail.page.html',
  styleUrls: ['./socialfeed-detail.page.scss'],
})
export class SocialfeedDetailPage implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
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
    this.postService.editPost('-LxfEUMtVzWQATKAN_KG', new Post()).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  getPost() {
    this.postService.getPost('-LxfEUMtVzWQATKAN_KG').then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  getAllPosts() {
    this.postService.getAllPosts().then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  like() {
    this.postService.likePost('-LxfEUMtVzWQATKAN_KG').then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  unlike() {
    this.postService.unlikePost('-LxfEUMtVzWQATKAN_KG').then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  newComment() {
    this.postService.createComment('-LxfEUMtVzWQATKAN_KG', new Comment()).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  editComment() {
    this.postService.editComment('-LxfEUMtVzWQATKAN_KG', '-LxfDHCgec1oZ268jioI', new Comment()).then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  getComment() {
    this.postService.getComment('-LxfEUMtVzWQATKAN_KG', '-LxfDHCgec1oZ268jioI').then(
        res => console.log(res),
        err => console.log(err)
    );
  }

  getAllComments() {
    this.postService.getAllComments('-LxfEUMtVzWQATKAN_KG').then(
        res => console.log(res),
        err => console.log(err)
    );
  }
}
