import {Component, OnInit} from '@angular/core';
import {ExportService} from '../../services/export/export.service';

@Component({
    selector: 'app-admin-dashboard-export',
    templateUrl: './admin-dashboard-export.page.html',
    styleUrls: ['./admin-dashboard-export.page.scss'],
})
export class AdminDashboardExportPage implements OnInit {
    users: any;
    groups: any;

    constructor(private exportService: ExportService) {
        this.users = [
            {
                name: 'Furkan Temel',
                group: 1
            },
            {
                name: 'Max Mustermann',
                group: 2
            },
            {
                name: 'Max Mustermann',
                group: 3
            },
            {
                name: 'Max Mustermann',
                group: 4
            },
            {
                name: 'Max Mustermann',
                group: 5
            }
        ];
    }

    ngOnInit() {
    }

    export(entity, scope) {
        console.log(scope);
        console.log(entity);
        const user = 'v8lODvmpyeQGXY7Rc4EmrhlLUYP2';
        const group = '-M-EZZDttEtxhZCk-xGR';
        if (scope === 'user') {
          this.exportService.export(entity, scope, user);
        } else if (scope === 'group'){
          this.exportService.export(entity, scope, group);
        }
        else if (scope === 'all'){
            this.exportService.export(entity, scope, 'all');
          }
    }

}
