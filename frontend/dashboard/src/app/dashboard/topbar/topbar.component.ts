import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenService} from "../../common/services/token.service";
import {NotesService} from "../notes.service";
import {faSearch, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: '#topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class TopbarComponent implements OnInit {
    faSearch = faSearch;
    faSignOutAlt = faSignOutAlt;
    constructor(private tokenService: TokenService,
                private notesService: NotesService) {
    }

    ngOnInit(): void {
    }

    logout() {
        this.tokenService.removeAuthToken();

    }
}
