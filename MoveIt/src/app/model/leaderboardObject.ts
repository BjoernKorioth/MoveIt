import {UserService} from '../services/user/user.service';

export class LeaderboardObject {
    id: string;
    username;
    activity: number;
    birthday;

    constructor(username: string, activity: number, private userService: UserService) {
        this.id = username;
        this.setUsername(username, userService);
        this.activity = activity || 0;
        userService.getSpecificUserBirthday(username).then
            (val => {
            this.birthday = val.val();
        });
    }

    compareTo(compare: LeaderboardObject): number {
        return (-1) * (this.activity - compare.activity);
    }

    async setUsername(uid, userService: UserService) {
        await userService.getSpecificUsername(uid).then(result => this.username = result.val());
    }
}
