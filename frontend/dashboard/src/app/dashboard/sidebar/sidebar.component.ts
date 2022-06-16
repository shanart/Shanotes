import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {faCalendarCheck, faList, faAngleLeft} from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: '#sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
    faCoffee = faCalendarCheck;
    notes = faList;
    toggleSidebar = faAngleLeft;

    constructor() {
    }

    ngOnInit(): void {
    }

}
