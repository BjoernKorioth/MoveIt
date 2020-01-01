export class User {
    id: string;
    name: string;
    challengesActive: Array<any>;
    challengesWon: Array<any>;
    group: number;
    trophiesWon: Array<any>;
    type: string;

    constructor(id?: string, name?: string, challengesActive?: Array<any>, challengesWon?: Array<any>, group?: number,
                trophiesWon?: Array<any>, type?: string) {
        this.id = id || '';
        this.name = name || '';
        this.challengesActive = challengesActive || [];
        this.challengesWon = challengesWon || [];
        this.group = group || -1;
        this.trophiesWon = trophiesWon || [];
        this.type = type || 'user';
    }

    toFirebaseObject() {
        return {
            name: this.name,
            challengesActive: JSON.stringify(this.challengesActive),
            challengesWon: JSON.stringify(this.challengesWon),
            group: this.group,
            trophiesWon: JSON.stringify(this.trophiesWon),
            type: this.type
        };
    }
}
