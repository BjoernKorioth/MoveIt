import {Component, OnInit} from '@angular/core';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import {PostService} from '../../services/post/post.service';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-socialfeed-detail',
    templateUrl: './socialfeed-detail.page.html',
    styleUrls: ['./socialfeed-detail.page.scss'],
})


export class SocialfeedDetailPage implements OnInit {
    posts: Observable<Post[]>;
    postText: string;
    commentText = [];

    constructor(private postService: PostService, private location: Location, private userService: UserService) {
        this.location = location;
    }

    async ngOnInit() {
        this.posts = this.postService.getAllPosts();
    }

    goBack() {
        this.location.back();
    }

    getTimeDifference(date) {
        // return new Date() - new Date(date);
    }

    newPost(text: string) {
        const post = new Post();
        post.content = text;

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

    newComment(post: Post, text) {
        if (this.commentText.length !== 0) {
            this.postService.createComment(post.id, text).then(
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

    getUsername(id) {
        return this.userService.getUsernameById(id);
    }
}
