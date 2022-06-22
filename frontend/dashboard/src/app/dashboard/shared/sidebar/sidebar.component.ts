import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    faCalendarCheck,
    faList,
    faAngleLeft,
    faAngleRight,
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
    toggleSidebarIcon = faAngleLeft;
    faLink = faLink;
    faFile = faFile;
    faBell = faBell;
    faAddressBook = faAddressBook;
    sidebar_active = true;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleSidebar(): void {
        this.sidebar_active = !this.sidebar_active;
        this.toggleSidebarIcon = this.sidebar_active? faAngleLeft: faAngleRight
    }

}
