interface FireBaseObject {
    id: string;
    distance: object;
    endTime: Date;
    intensity: string;
    startTime: Date;
    type: string;
    source: string;
}

interface ApiObject {
    calories: number;
    distance: number;
    startDate: Date;
    sourceBundleId: string;
    endDate: Date;
    unit: string;
    value: string;
    source: string;
}

interface Distance {
    unit: string,
    value: number
}

export class Activity {
    startDateIso: string;
    startTimeIso: string;
    minutes: number;

    /**
     * Constructor to create Activity
     *
     * Each parameter is optional. If it's not present, a default value is used
     *
     */
    constructor(id?: string, distance?: Distance, endTime?: Date, intensity?: string, startTime?: Date, type?: string, source?: string) {
        // Each parameter is optional, if it's not there, set the default value
        this.id = id || '';
        this.distance = distance || {unit: 'km', value: 0};
        this.endTime = endTime || new Date(2019, 0O5, 0O5, 17, 23, 42, 0);
        this.intensity = intensity || 'moderate';
        this.startTime = startTime || new Date(2019, 0O5, 0O5, 17, 55, 42, 0);
        this.type = type || 'running';
        this.source = source || 'unknown'
    }

    static types = ['basketball', 'biking', 'dancing','handball','football','running', 'swimming', 'volleyball', 'walking', 'other'];
    static intensities = ['moderate', 'vigorous', 'weight training'];
    id: string;
    distance: Distance;
    endTime: Date;
    intensity: string;
    startTime: Date;
    type: string;
    source: string;

    /**
     * Creates an Activity object from a firebase query
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param id id of the activity
     * @param firebaseObject result of the query
     */

    static fromFirebaseObject(id: string, activity: Activity) {// firebaseObject: FireBaseObject) {
        // @ts-ignore TS2339        
        return new Activity(
            id,
            activity.distance,            
            new Date(activity.endTime) || new Date(),
            activity.intensity || '',
            new Date(activity.startTime) || new Date(), // new Date(firebaseObject.startTime) || new Date(),
            activity.type || '',
            activity.source || 'unknown'
        );
    }

    /**
     * Converts the activity to upload it to firebase
     *
     * Basically just replaces the dates with date strings
     */
    toFirebaseObject() {
        return {
            distance: this.distance,
            endTime: this.endTime.getTime(),
            intensity: this.intensity,
            startTime: this.startTime.getTime(),
            type: this.type,
            source: this.source,
        };
    }

    /**
     * Creates an Activity object from an Fitnes API Object
     *
     * This basically reconstructs the dates from the date strings
     *
     * @param ApiObject object from Fitness API
     */

    static fromFitApi(ApiObject: Array<ApiObject>) {
        var ActMulit = [];
        var ActSingle: Activity;
        ApiObject.forEach(function (SingleEntry) {
            console.log('Single Entry of Fitness API: ' + SingleEntry);
            // still activity will be excluded
            if(SingleEntry.value == "still"){
                return;
            };
            // activities that are not defined by API will be excluded
            if(SingleEntry.value == "other"){
                return;
            };
            //activities shorter then 10 minutes will be disregarded
            var duration = Math.round((SingleEntry.endDate.getTime() - SingleEntry.startDate.getTime())/60000);
            if(duration < 10){
                return;
            }

            /*
            if (['basketball', 'biking', 'dancing','handball','football','running', 'swimming', 'volleyball', 'walking'].indexOf(SingleEntry.value) == -1){
                SingleEntry.value = 'other'
            };  */   

            ActSingle = new Activity(
                '',
                {unit: 'm', value: SingleEntry.distance},          
                SingleEntry.endDate,
                '',
                SingleEntry.startDate,
                SingleEntry.value,
                SingleEntry.sourceBundleId,
            );
            ActMulit.push(ActSingle);
        }); 
        return ActMulit;
    }

     /**
     * Converts the activity to upload it to Fitness API
     */
    toFitApi() {
        return {
            calories: 0,
            distance: this.distance.value,
            endDate: this.endTime,
            sourceBundleId: 'com.moveitproject.www',
            startDate: this.startTime,
            unit: 'activityType',
            value: this.type,
            source: this.source,
        };
    }

    /**
     * Returns the duration of the activity in minutes
     */
    getDuration() {
        return Math.round((this.endTime.getTime() - this.startTime.getTime())/60000);
    }
}
