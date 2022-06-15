import {Injectable} from '@angular/core';
import {AuthTokens, Login} from "../models/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from 'rxjs';
import {TokenService} from "./token.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiRoot: string = 'http://localhost:8000';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    login(form: Login) {
        const url = `${this.apiRoot}/api/v1/auth/`;
        return this.http.post<AuthTokens>(url, form, this.httpOptions).pipe(
            tap((response) => {
                this.tokenService.saveToLocalStorage(response)
            }),
        );
    }

    isAuthenticated(): boolean {
        return this.tokenService.tokensExists()
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }

}
