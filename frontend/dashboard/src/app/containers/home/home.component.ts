import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenService} from "../../shared/services/token.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    constructor(private tokenService: TokenService) {
    }

    ngOnInit() {
    }

    logout(): void {
        this.tokenService.removeAuthToken();
    }

}
