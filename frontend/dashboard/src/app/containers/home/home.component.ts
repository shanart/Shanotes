import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenService} from "../../shared/services/token.service";
import {NotesService} from "../../shared/services/notes.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

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

    logout(): void {
        this.tokenService.removeAuthToken();
    }

}
