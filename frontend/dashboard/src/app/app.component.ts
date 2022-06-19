import {Component, ViewEncapsulation, ElementRef} from '@angular/core';
import {AuthService} from "./common/services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: '#root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'dashboard';

    constructor(
        private router: Router,
        private auth: AuthService,
        private _elementRef: ElementRef) {
    }

    ngOnInit() {
        this._elementRef.nativeElement.removeAttribute("ng-version");
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        }
    }
}
