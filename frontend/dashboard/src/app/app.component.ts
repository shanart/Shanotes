import {Component, ViewEncapsulation, ElementRef} from '@angular/core';

@Component({
    selector: '#root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'dashboard';

    constructor(private _elementRef: ElementRef) {
    }

    ngOnInit() {
        this._elementRef.nativeElement.removeAttribute("ng-version");
    }
}
