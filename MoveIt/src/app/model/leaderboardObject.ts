import {UserService} from '../services/user/user.service';

import {first} from 'rxjs/operators';

export class LeaderboardObject {
    id: string;
    username;
    activity: number;
    birthday;
    pictureProfileUrl;

    constructor(username: string, activity: number, private userService: UserService) {
        this.id = username;
        this.setUsername(username, userService);
        this.activity = activity || 0;
        userService.getSpecificUserBirthday(username).then
            (val => {
            this.birthday = val.val();
        });

        this.pictureProfileUrl = userService.getSpecificProfilePictureUrl(this.id).pipe(first());
    }

    compareTo(compare: LeaderboardObject): number {
        return (-1) * (this.activity - compare.activity);
    }

    async setUsername(uid, userService: UserService) {
        await userService.getSpecificUsername(uid).then(result => this.username = result.val());
    }
}
