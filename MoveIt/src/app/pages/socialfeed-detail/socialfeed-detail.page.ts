import {Component, OnInit} from '@angular/core';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import {PostService} from '../../services/post/post.service';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {UserService} from '../../services/user/user.service';
import {first, map} from 'rxjs/operators';
import { User } from 'src/app/model/user';

@Component({
    selector: 'app-socialfeed-detail',
    templateUrl: './socialfeed-detail.page.html',
    styleUrls: ['./socialfeed-detail.page.scss'],
})


export class SocialfeedDetailPage implements OnInit {
    posts: Observable<any[]>;
    postText: string;
    commentText = [];
    now = new Date();
    post: Post;
    user:User; 

    constructor(private postService: PostService, private location: Location, private userService: UserService) {
        this.location = location;
    }

    async ngOnInit() {
        this.posts = this.postService.getAllPosts().pipe(map(posts => posts.map(post => {
            const pseudoPost = {
                username: this.getUsername(post.user).pipe(first()),
                usernames: [],
                ...post
            };
            pseudoPost.usernames = pseudoPost.comments.map(comment => this.getUsername(comment.user).pipe(first()));
            return pseudoPost;
        })));
        this.posts.subscribe(r => console.log(r));
        this.userService.getUser().subscribe(user => this.user = user);
    }

    goBack() {
        this.location.back();
    }

    getTimeDifference(date: Date) {
        return Math.round(this.now.getTime() - date.getTime() / 60 * 1000);
    }

    newPost(text: string) {
        const post = new Post();
        post.content = text;

        this.postService.createPost(post).then(
            res => console.log(res),
            err => console.log(err)
        );
        this.postText = '';
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
        this.postService.getPost(liked).then(
            res => {
                this.post = res;
            },
            err => console.log(err)
        );
        console.log(this.post);
    }

    unlike(i) {
        const unliked = document.getElementsByName('userPlace')[i].id;
        this.postService.unlikePost(unliked).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    newComment(post: Post, text, index: number) {
        if (this.commentText.length !== 0) {
            this.postService.createComment(post.id, text).then(
                res => {
                    // @ts-ignore
                    this.userService.getUsername().pipe(first()).subscribe(username => post.usernames.push(username));
                    console.log(res);
                    this.commentText[index] = '';
                },
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
