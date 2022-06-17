import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    faCalendarCheck,
    faList,
    faAngleLeft,
    faLink,
    faFile,
    faBell,
    faAddressBook
} from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: '#sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
    faCalendar = faCalendarCheck;
    notes = faList;
    toggleSidebar = faAngleLeft;
    faLink = faLink;
    faFile = faFile;
    faBell = faBell;
    faAddressBook = faAddressBook;

    constructor() {
    }

    ngOnInit(): void {
    }

}
