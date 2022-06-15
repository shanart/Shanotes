import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenService} from "../common/services/token.service";
import {NotesService} from "./notes.service";

@Component({
    selector: '#dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    constructor(private tokenService: TokenService,
                private notesService: NotesService) {
    }

    ngOnInit() {
        this.notesService.getNotesList().pipe().subscribe({
            next: data => {
                console.log(data)
            }
        })
    }
}
