import {Component, OnInit} from '@angular/core';
import {InformationService} from '../../services/information/information.service';
import {Information} from '../../model/information';
import {Location} from '@angular/common';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-information-detail',
    templateUrl: './information-detail.page.html',
    styleUrls: ['./information-detail.page.scss'],
})
export class InformationDetailPage implements OnInit {
    static: any;
    dynamic: any;

    constructor(private informationService: InformationService, private location: Location, private router: Router, private route: ActivatedRoute) {
        this.location = location;
        informationService.getAllInformation().subscribe(dynamic => this.dynamic = dynamic);
        informationService.getAllInformation().subscribe(dynamic => console.log(dynamic));


        this.static = [
            {
                title: 'moderate vs. vigorous',
                description: 'What is Moderate-intensity and Vigorous-intensity Physical Activity?',
                content: 'Intensity refers to the rate at which the activity is being performed or the magnitude of the effort required to perform an activity or exercise. It can be thought of How hard a person works to do the activity. The intensity of different forms of physical activity varies between people. The intensity of physical activity depends on an individuals previous exercise experience and their relative level of fitness. Consequently, the examples given below are provided as a guide only and will vary between individuals.',
                picture: 'Stopwatch.jpg'
            },
            {
                title: 'WHO Guidelines',
                description: 'Recommended levels of physical activity for adults aged 18 - 64 years',
                content: 'Adults aged 18–64 should do at least 150 minutes of moderate-intensity aerobic physical activity throughout the week or do at least 75 minutes of vigorous-intensity aerobic physical activity throughout the week or an equivalent combination of moderate- and vigorous-intensity activity. Aerobic activity should be performed in bouts of at least 10 minutes duration. For additional health benefits, adults should increase their moderate-intensity aerobic physical activity to 300 minutes per week, or engage in 150 minutes of vigorous-intensity aerobic physical activity per week, or an equivalent combination of moderate- and vigorous-intensity activity. Muscle-strengthening activities should be done involving major muscle groups on 2 or more days a week.',
                picture: 'Stopwatch.jpg'
            },
        ];

        let infoId;
        this.route.queryParams.subscribe(params=>{
            if(params.infoId == null) {
                return;
            }
            infoId = JSON.parse(params.infoId);            

            if(infoId !== null && infoId !== undefined) {            
                const object = this.static[infoId];
    
                let navigationExtras: NavigationExtras = {
                    queryParams: {
                        special: JSON.stringify(object)
                    },
                    replaceUrl: true
                }
                this.router.navigate(['/menu/information/information/single'], navigationExtras);
            }
        });                
    }

    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }

    passData(i){

        const object = this.static[i];

        let navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(object)
            }
        }
        this.router.navigate(['/menu/information/information/single'], navigationExtras);
    }

    // TODO For testing purposes only, only reserachers can create activities
    createInformation() {
        this.informationService.createInformation(new Information()).then(
            res => {
                console.log(res);
            },
            err => console.log(err));
    }

    // TODO For testing purposes only, only reserachers can edit activities
    editInformation() {
        this.informationService.editInformation('-LxazngpwtMfICMajpTv', new Information()).then(
            res => {
                console.log(res);
            },
            err => console.log(err));
    }

    // TODO For testing purposes only, only the detail view needs to get a single information
    getInformation() {
        this.informationService.getInformation('-LxazngpwtMfICMajpTv').then(
            res => {
                console.log(res);
            },
            err => console.log(err)
        );
    }
}
