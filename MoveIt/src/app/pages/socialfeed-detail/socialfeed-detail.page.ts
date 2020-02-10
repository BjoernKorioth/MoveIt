import {Component, OnInit} from '@angular/core';
import {Post} from '../../model/post';
import {Comment} from '../../model/comment';
import {PostService} from '../../services/post/post.service';
import {Observable, merge} from 'rxjs';
import {Location} from '@angular/common';
import {UserService} from '../../services/user/user.service';
import {first, map} from 'rxjs/operators';
import { User } from 'src/app/model/user';
import {Router, NavigationExtras} from '@angular/router';

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
    displayedPosts: Observable<any[]>;


    link: Observable<string>;

    constructor(private router: Router, private postService: PostService, private location: Location, private userService: UserService) {
        this.location = location;
    }

    ngOnInit() {
        this.posts = this.postService.getAllPosts().pipe(map(posts => posts.map(post => {
            const pseudoPost = {
                username: this.getUsername(post.user).pipe(first()),
                profilePictureUrl: this.getSpecificProfilePictureUrl(post.user).pipe(first()),
                usernames: [],
                ...post
            };
            pseudoPost.usernames = pseudoPost.comments.map(comment => this.getUsername(comment.user).pipe(first()));
            return pseudoPost;
        })));
        this.posts.subscribe(r => console.log(r));
        this.userService.getUser().subscribe(user => this.user = user);

        this.displayedPosts = this.posts.pipe(map(
            (data) => {
               // data.sort((a, b) => {
                 //   return b.startTime.getTime() - a.startTime.getTime();
                //});
                return data.slice(0, 10);
            }
        ));
        console.log(this.displayedPosts);
    }

    loadMorePosts(){
        let currentlyDisplayed = 0;
        this.displayedPosts.subscribe(
            c => currentlyDisplayed = c.length
        );

        const newDisplayedActivities = this.posts.pipe(
            map(data => data.slice(0, currentlyDisplayed + 5))
        );

        this.displayedPosts = merge(
            this.displayedPosts,
            newDisplayedActivities
        );
    }

    goBack() {
        this.location.back();
    }

    nextCommentPage(post: Post){
        post.commentPage++;
    }

    viewProfile(i){
        const postid = document.getElementsByName('userPlace')[i].id;
        this.postService.getPost(postid).then(
            res => {
                let navigationExtras: NavigationExtras = {
                    queryParams: {
                        special: JSON.stringify(res.user)
                    }
                }
                this.router.navigate(['/menu/profile/profile/view'], navigationExtras);
            }
        );
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

    getSpecificProfilePictureUrl(id){
        return this.userService.getSpecificProfilePictureUrl(id);
    }
}
