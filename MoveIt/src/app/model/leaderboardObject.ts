

import { AuthenticateService } from '../services/authentication/authentication.service';

export class LeaderboardObject{
    id: string;
    username;
    activity: number;

    constructor(username: string, activity: number, private auth:AuthenticateService){
        this.id = username;
        this.setUsername(username, auth);
        this.activity = activity || 0;
    }

    compareTo(compare: LeaderboardObject): number {
        return (-1) * (this.activity - compare.activity);
    }

    async setUsername(uid, auth:AuthenticateService){
        await auth.getSpecificUsername(uid).then(result => this.username = result.val());
    }
}