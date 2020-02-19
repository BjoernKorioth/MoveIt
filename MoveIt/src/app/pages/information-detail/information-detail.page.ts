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
                description: 'This is a short description. To view the full text, please click the button below',
                content: 'moderate activity',
                picture: 'Stopwatch.jpg'
            },
            {
                title: 'WHO Guidelines',
                description: 'This is a short description. To view the full text, please click the button below',
                content: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
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
