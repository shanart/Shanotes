import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {Login} from "../../shared/models/common";
import {of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";


@Component({
    selector: '#login',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    errors: any = null;
    loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]]
    });

    constructor(private router: Router,
                private auth: AuthService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    clearErrors(): void {
        this.errors = null;
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value as Login).subscribe({
                next: resp => {
                    this.router.navigate(['/home']);
                },
                error: err => this.errors = err.error
            })
        }
    }

}
