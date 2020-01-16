export class LeaderboardObject{
    username: string;
    activity: number;

    constructor(username: string, activity: number){
        this.username = username || 'TestName'
        this.activity = activity || 0;
    }

    compareTo(compare: LeaderboardObject): number {
        return (-1) * (this.activity - compare.activity);
    }
}