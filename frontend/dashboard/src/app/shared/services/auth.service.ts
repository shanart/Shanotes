import {Injectable} from '@angular/core';
import {Login} from "../models/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiRoot: string = 'http://localhost:8000';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
    }

    login(form: Login) {
        const url = `${this.apiRoot}/api/v1/auth/`;
        return this.http.post(url, form, this.httpOptions)
        //     .pipe(
        //     tap((response: any) => console.log(response)),
        //     catchError(this.handleError<Login>('Login'))
        // );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }

}
