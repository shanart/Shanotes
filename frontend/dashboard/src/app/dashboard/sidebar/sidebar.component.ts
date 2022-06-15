import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: '#sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
    faCoffee = faCalendarCheck;

    constructor() {
    }

    ngOnInit(): void {
    }

}
