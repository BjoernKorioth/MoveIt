import {Component, OnInit} from '@angular/core';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import {PostService} from '../../services/post/post.service';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';

@Component({
    selector: 'app-socialfeed-detail',
    templateUrl: './socialfeed-detail.page.html',
    styleUrls: ['./socialfeed-detail.page.scss'],
})


export class SocialfeedDetailPage implements OnInit {
    posts: Observable<Post[]>;

    constructor(private postService: PostService, private location: Location) {
        this.location = location;
    }

    async ngOnInit() {
        this.posts = this.postService.getAllPosts();
        this.posts.subscribe(res => {
            console.log(res);
        });
    }

    goBack() {
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

    like(i) {
        const liked = document.getElementsByName('userPlace')[i].id;
        this.postService.likePost(liked).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    unlike(i) {
        const unliked = document.getElementsByName('userPlace')[i].id;
        this.postService.unlikePost(unliked).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    newComment(i) {
        const postid = document.getElementsByName('userPlace')[i].id;
        const userComment = document.getElementsByTagName('input')[i].value;
        console.log('Comment ' + userComment);
        if (userComment.length !== 0) {
            this.postService.createComment(postid, userComment).then(
                res => console.log(res),
                err => console.log(err)
            );
        }
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
