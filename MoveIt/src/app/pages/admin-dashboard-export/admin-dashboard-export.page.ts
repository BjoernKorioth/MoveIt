import {Component, OnInit} from '@angular/core';
import {ExportService} from '../../services/export/export.service';
import {UserService} from 'src/app/services/user/user.service';
import {Group} from 'src/app/model/group';
import {User} from 'src/app/model/user';

@Component({
    selector: 'app-admin-dashboard-export',
    templateUrl: './admin-dashboard-export.page.html',
    styleUrls: ['./admin-dashboard-export.page.scss'],
})
export class AdminDashboardExportPage implements OnInit {
    users: Array<User>;
    groups: Array<Group>;

    constructor(private exportService: ExportService, private userService: UserService) {
        this.userService.getGroups().subscribe(val => this.groups = val);
        this.userService.getUsers().subscribe(val => this.users = val);
    }

    ngOnInit() {
    }

    export(entity, scope, value) {
        console.log(scope);
        console.log(entity);
        if (scope === 'user') {
            this.exportService.export(entity, scope, value);
        } else if (scope === 'group') {
            this.exportService.export(entity, scope, value);
        } else if (scope === 'all') {
            this.exportService.export(entity, scope, 'all');
        }
    }

    exportDb() {
        this.exportService.exportDb();
    }

}
