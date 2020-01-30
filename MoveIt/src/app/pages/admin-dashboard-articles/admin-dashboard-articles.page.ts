import {Component, OnInit} from '@angular/core';
import {Information} from '../../model/information';
import {Observable} from 'rxjs';
import {InformationService} from '../../services/information/information.service';


import {PopoverController} from '@ionic/angular';
import {ArticlesPopoverComponent} from 'src/app/articles-popover/articles-popover.component';

@Component({
    selector: 'app-admin-dashboard-articles',
    templateUrl: './admin-dashboard-articles.page.html',
    styleUrls: ['./admin-dashboard-articles.page.scss'],
})
export class AdminDashboardArticlesPage implements OnInit {
    // articles: any;
    articlesObserve: Observable<Information[]>;
    articles: Array<Information>;
    information: Information;

    article: any;

    constructor(private informationService: InformationService, public popoverController: PopoverController) {

        this.articlesObserve = this.informationService.getAllInformation();
        this.articlesObserve.subscribe(result => this.updateAllInformation(result));


        /*this.articles = [
          constructor(public popoverController:PopoverController) {
            this.articles = [
              {
                title: 'Guidelines from the WHO',
                description: 'Intensity refers to the rate at which activity',
                link:'https://www.google.com',
                picture: './assets/Trophy.png'
              },
              {
                title: 'Guidelines from the WHO',
                description: 'Intensity refers to the rate at which activity',
                link:'https://www.google.com',
                picture: './assets/Trophy.png'
              }
            ]*/
    }

    editArticle(article: Information) {

        console.log(article);

        this.informationService.editInformation(article.id, article).then(
            res => console.log(res),
            err => console.log(err)
        );
    }

    updateAllInformation(newInformation: Array<Information>) {
        this.articles = newInformation;
    }

    async presentPopover(event) {
        const popover = await this.popoverController.create({
            component: ArticlesPopoverComponent,
            event
        });
        return await popover.present();
    }

    ngOnInit() {
    }

    addInformation() {
        console.log(this.information);
        this.informationService.createInformation(this.information).then(
            (information) => {
                console.log(information);
            })
            .catch(err => console.error(err)
            );
        // this.presentAlert();
    }

}
